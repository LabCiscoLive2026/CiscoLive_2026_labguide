#!/usr/bin/env python
"""Fetch first Stealthwatch tenant id via curl. Needs curl, python-dotenv, .env with SMC_*."""

import json
import os
import subprocess
import sys
import tempfile
from urllib.parse import quote_plus

from dotenv import load_dotenv

load_dotenv()

SMC_USER = (os.getenv('SMC_USER') or '').strip()
SMC_PASSWORD = (os.getenv('SMC_PASSWORD') or '').strip()
SMC_HOST = (os.getenv('SMC_HOST') or '').strip()
SCHEME = (os.getenv('SMC_LOGIN_SCHEME') or 'https').split(':')[0].lower()
CT = os.getenv('SMC_CURL_CONNECT_TIMEOUT', '15').strip() or '15'
MT = os.getenv('SMC_CURL_MAX_TIME', '120').strip() or '120'

if not SMC_HOST or not SMC_USER or not SMC_PASSWORD:
    print('Set SMC_HOST, SMC_USER, and SMC_PASSWORD in .env', file=sys.stderr)
    sys.exit(1)


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


form = 'username={}&password={}'.format(quote_plus(SMC_USER), quote_plus(SMC_PASSWORD))
login_url = SCHEME + '://' + SMC_HOST + '/token/v2/authenticate'

with tempfile.TemporaryDirectory() as tmp:
    jar = os.path.join(tmp, 'cookies.txt')
    out = os.path.join(tmp, 'body.json')
    print( curl_prefix()
        + [
            '-c', jar, '-o', out, '-w', '%{http_code}',
            '-H', 'Content-Type: application/x-www-form-urlencoded',
            '-d', '@-', login_url,
        ],)

    st = curl(
        curl_prefix()
        + [
            '-c', jar, '-o', out, '-w', '%{http_code}',
            '-H', 'Content-Type: application/x-www-form-urlencoded',
            '-d', '@-', login_url,
        ],
        stdin=form.encode('utf-8'),
    )
    print(login_url)
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
    tenants = 'https://' + SMC_HOST + '/sw-reporting/v1/tenants/'
    cmd = curl_prefix() + ['-b', jar, '-o', out, '-w', '%{http_code}']
    if xsrf:
        cmd += ['-H', 'X-XSRF-TOKEN: ' + xsrf]
    cmd.append(tenants)

    st = curl(cmd)
    if st != 200:
        print('Tenants failed: HTTP {}'.format(st), file=sys.stderr)
        sys.exit(1)

    with open(out, encoding='utf-8', errors='replace') as f:
        data = json.load(f)['data']
    print('Tenant ID = {}'.format(data[0]['id']))

    logout = 'https://' + SMC_HOST + '/token'
    cmd = curl_prefix() + ['-b', jar, '-X', 'DELETE', '-o', os.devnull, '-w', '%{http_code}']
    if xsrf:
        cmd += ['-H', 'X-XSRF-TOKEN: ' + xsrf]
    cmd.append(logout)
    curl(cmd)
