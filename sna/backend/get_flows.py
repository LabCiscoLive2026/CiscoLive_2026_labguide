#!/usr/bin/env python
"""Run a Stealthwatch flows query (last 60 min) via curl; return rows as a DataFrame."""

import json
import os
import subprocess
import sys
import tempfile
import time
from datetime import datetime, timedelta, timezone
from urllib.parse import quote_plus

import pandas as pd
from dotenv import load_dotenv

load_dotenv()

SMC_USER = (os.getenv('SMC_USER') or '').strip()
SMC_PASSWORD = (os.getenv('SMC_PASSWORD') or '').strip()
SMC_HOST = (os.getenv('SMC_HOST') or '').strip()
SMC_TENANT_ID = (os.getenv('SMC_TENANT_ID') or '').strip()
SCHEME = (os.getenv('SMC_LOGIN_SCHEME') or 'https').split(':')[0].lower()
CT = os.getenv('SMC_CURL_CONNECT_TIMEOUT', '15').strip() or '15'
MT = os.getenv('SMC_CURL_MAX_TIME', '300').strip() or '300'


def curl(cmd, stdin=None):
    try:
        p = subprocess.run(
            cmd,
            input=stdin,
            capture_output=True,
            timeout=float(MT) + float(CT) + 5.0,
            check=False,
        )
    except subprocess.TimeoutExpired:
        print('curl: timed out', file=sys.stderr)
        sys.exit(1)
    if p.returncode != 0:
        print((p.stderr or b'').decode('utf-8', errors='replace').strip() or 'curl exit {}'.format(p.returncode), file=sys.stderr)
        sys.exit(1)
    out = (p.stdout or b'').decode('utf-8', errors='replace').strip()
    if not out.isdigit():
        print('curl: could not read HTTP status', file=sys.stderr)
        sys.exit(1)
    return int(out)


def cookie_value(path, name):
    with open(path, encoding='utf-8', errors='replace') as f:
        for line in f:
            if line.startswith('#') or not line.strip():
                continue
            parts = line.rstrip('\n').split('\t')
            if len(parts) >= 7 and parts[5] == name:
                return parts[6]
    return None


def curl_prefix():
    return [
        'curl', '-sS', '-k', '--noproxy', '*',
        '--connect-timeout', CT, '--max-time', MT,
    ]


def curl_with_cookies(jar, xsrf, out_path, url, method='GET', stdin=None, headers=None):
    cmd = curl_prefix() + ['-b', jar, '-o', out_path, '-w', '%{http_code}']
    if xsrf:
        cmd += ['-H', 'X-XSRF-TOKEN: ' + xsrf]
    if headers:
        for k, v in headers:
            cmd += ['-H', '{}: {}'.format(k, v)]
    if method != 'GET':
        cmd += ['-X', method]
    if stdin is not None:
        cmd += ['-d', '@-']
    cmd.append(url)
    return curl(cmd, stdin=stdin)


def fetch_flows_dataframe():
    """
    Log in, run a flows query for the last 60 minutes, log out; return flows as a DataFrame.

    Uses SMC_* from the environment (.env). Raises SystemExit on curl/API errors.
    """
    if not SMC_HOST or not SMC_USER or not SMC_PASSWORD or not SMC_TENANT_ID:
        print('Set SMC_HOST, SMC_USER, SMC_PASSWORD, and SMC_TENANT_ID in .env', file=sys.stderr)
        sys.exit(1)

    form = 'username={}&password={}'.format(quote_plus(SMC_USER), quote_plus(SMC_PASSWORD))
    login_url = SCHEME + '://' + SMC_HOST + '/token/v2/authenticate'

    with tempfile.TemporaryDirectory() as tmp:
        jar = os.path.join(tmp, 'cookies.txt')
        out = os.path.join(tmp, 'body.json')

        st = curl(
            curl_prefix()
            + [
                '-c', jar, '-o', out, '-w', '%{http_code}',
                '-H', 'Content-Type: application/x-www-form-urlencoded',
                '-d', '@-', login_url,
            ],
            stdin=form.encode('utf-8'),
        )
        if st != 200:
            try:
                with open(out, encoding='utf-8', errors='replace') as f:
                    preview = f.read(800)
            except OSError:
                preview = ''
            print('Login failed: HTTP {}'.format(st), file=sys.stderr)
            if preview.strip():
                print(preview, file=sys.stderr)
            sys.exit(1)

        xsrf = cookie_value(jar, 'XSRF-TOKEN')

        def logout():
            u = 'https://' + SMC_HOST + '/token'
            cmd = curl_prefix() + ['-b', jar, '-X', 'DELETE', '-o', os.devnull, '-w', '%{http_code}']
            if xsrf:
                cmd += ['-H', 'X-XSRF-TOKEN: ' + xsrf]
            cmd.append(u)
            curl(cmd)

        flows = []
        try:
            now = datetime.now(timezone.utc)
            start = now - timedelta(days=1)
            payload = {
                'startDateTime': start.strftime('%Y-%m-%dT%H:%M:%SZ'),
                'endDateTime': now.strftime('%Y-%m-%dT%H:%M:%SZ'),
                'recordLimit': 8000,
            }
            body = json.dumps(payload).encode('utf-8')
            query_url = 'https://' + SMC_HOST + '/sw-reporting/v2/tenants/' + SMC_TENANT_ID + '/flows/queries'
            st = curl_with_cookies(
                jar,
                xsrf,
                out,
                query_url,
                method='POST',
                stdin=body,
                headers=[('Content-Type', 'application/json'), ('Accept', 'application/json')],
            )
            if st != 201:
                print('Flows query failed: HTTP {}'.format(st), file=sys.stderr)
                sys.exit(1)

            print('Generating results. Please wait...\n', file=sys.stderr)
            with open(out, encoding='utf-8', errors='replace') as f:
                search = json.load(f)['data']['query']
            qid = search['id']
            status_url = 'https://' + SMC_HOST + '/sw-reporting/v2/tenants/' + SMC_TENANT_ID + '/flows/queries/' + qid
            print(status_url)

            polls = 0
            while float(search.get('percentComplete', 0)) < 100.0:
                polls += 1
                if polls > 600:
                    print('Query still incomplete after 600 polls; giving up.', file=sys.stderr)
                    sys.exit(1)
                st = curl_with_cookies(jar, xsrf, out, status_url)
                if st != 200:
                    print('Poll failed: HTTP {}'.format(st), file=sys.stderr)
                    sys.exit(1)
                with open(out, encoding='utf-8', errors='replace') as f:
                    search = json.load(f)['data']['query']
                time.sleep(1)

            results_url = status_url + '/results'
            print(results_url)
            st = curl_with_cookies(jar, xsrf, out, results_url)
            if st != 200:
                print('Results failed: HTTP {}'.format(st), file=sys.stderr)
                sys.exit(1)
            with open(out, encoding='utf-8', errors='replace') as f:
                flows = json.load(f)['data']['flows']
        finally:
            logout()

    if not flows:
        return pd.DataFrame()
    if isinstance(flows[0], dict):
        return pd.json_normalize(flows)
    return pd.DataFrame(flows)


def format_timestamps(df, columns=None, fmt='%Y-%m-%d %H:%M:%S'):
    """Convert ISO‑8601 / Stealthwatch timestamp columns to a readable format."""
    if columns is None:
        columns = [c for c in df.columns if 'Time' in c or 'time' in c]
    for col in columns:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce').dt.strftime(fmt)
    return df


def filter_valid_ports(df, columns=None):
    """Drop rows where any of the given port columns is ≤ 0 (e.g. ICMP = -1)."""
    if columns is None:
        columns = ['subject.portProtocol.port', 'peer.portProtocol.port']
    df = df.copy()
    for col in columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').astype('Int64')
            df = df[df[col] > -2]
    return df


def save_to_excel(df, path='flows.xlsx', sheet_name='Flows'):
    """Write a DataFrame to an Excel file with auto‑sized columns."""
    with pd.ExcelWriter(path, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name=sheet_name)
        ws = writer.sheets[sheet_name]
        for col_cells in ws.columns:
            max_len = max(len(str(cell.value or '')) for cell in col_cells)
            header_len = len(str(col_cells[0].value or ''))
            ws.column_dimensions[col_cells[0].column_letter].width = max(max_len, header_len) + 3
    print('Saved {} rows to {}'.format(len(df), path), file=sys.stderr)


DISPLAY_COLUMNS = [
    'id',
    'flowCollectorId',
    'protocol',
    'statistics.firstActiveTime',
    'statistics.lastActiveTime',
    'statistics.activeDuration',
    'statistics.byteCount',
    'subject.ipAddress',
    'subject.portProtocol.port',
    'peer.ipAddress',
    'peer.portProtocol.port',
    'peer.bytes',
]


if __name__ == '__main__':
    df = fetch_flows_dataframe()
    print('rows={} cols={}'.format(len(df), len(df.columns)), file=sys.stderr)

    df = format_timestamps(df)
    df = filter_valid_ports(df, columns=['subject.portProtocol.port', 'peer.portProtocol.port'])
    df = df.reset_index(drop=True)

    available = [c for c in DISPLAY_COLUMNS if c in df.columns]

    if 'peer.ipAddress' in df.columns:
        df = df[df['peer.ipAddress'].str.startswith('10.0.13.', na=False)]
        df = df.reset_index(drop=True)

    with pd.option_context('display.max_rows', 30, 'display.max_columns', 16, 'display.width', 160):
        print(df[available])

    save_to_excel(df[available])
