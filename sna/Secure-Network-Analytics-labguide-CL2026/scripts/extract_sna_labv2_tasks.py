#!/usr/bin/env python
"""Extract Splunk task bodies from ../SNALabv2.docx into docs/task03.md and docs/task04.md.

Markers follow *SNALabv2.docx*:
  - task03.md <- Word "Task 3: Identifying Top Utilized Hosts" … before "Task 4: Analyzing Top Flows"
  - task04.md <- Word "Task 4: Analyzing Top Flows …" … before "Lab Summary"

Re-run only to refresh Splunk narrative from Word; merge manually with fenced SPL, images, and cross-refs.
"""
from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT.parent / 'SNALabv2.docx'
DOCS = ROOT / 'docs'
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}


def cell_text(tc: ET.Element) -> str:
    parts: list[str] = []
    for t in tc.findall('.//w:t', NS):
        if t.text:
            parts.append(t.text)
        if t.tail:
            parts.append(t.tail)
    return ''.join(parts).strip()


def table_md(tbl: ET.Element) -> str:
    rows: list[list[str]] = []
    for tr in tbl.findall('w:tr', NS):
        cells = [cell_text(tc) for tc in tr.findall('w:tc', NS)]
        if cells:
            rows.append(cells)
    if not rows:
        return ''
    w = max(len(r) for r in rows)
    rows = [r + [''] * (w - len(r)) for r in rows]
    lines = [
        '| ' + ' | '.join(rows[0]) + ' |',
        '| ' + ' | '.join(['---'] * w) + ' |',
    ]
    for r in rows[1:]:
        lines.append('| ' + ' | '.join(r) + ' |')
    return '\n'.join(lines) + '\n'


def para_text(p: ET.Element) -> str:
    parts: list[str] = []
    for t in p.findall('.//w:t', NS):
        if t.text:
            parts.append(t.text)
        if t.tail:
            parts.append(t.tail)
    return ''.join(parts)


def docx_body_parts() -> list[tuple[str, str]]:
    with zipfile.ZipFile(DOCX, 'r') as z:
        root = ET.fromstring(z.read('word/document.xml'))
    body = root.find('w:body', NS)
    assert body is not None
    out: list[tuple[str, str]] = []
    for child in body:
        tag = child.tag.split('}')[-1]
        if tag == 'p':
            t = para_text(child).strip()
            if t:
                out.append(('p', t))
        elif tag == 'tbl':
            md = table_md(child)
            if md.strip():
                out.append(('tbl', md))
    return out


def parts_to_plain(parts: list[tuple[str, str]]) -> str:
    chunks: list[str] = []
    for kind, content in parts:
        if kind == 'p':
            chunks.append(content)
        else:
            chunks.append('\n' + content + '\n')
    text = '\n\n'.join(chunks)
    return re.sub(r'\n{4,}', '\n\n\n', text)


def wrap_spl_queries(text: str) -> str:
    """Fence Splunk queries; collapse blank lines inside query to single newlines."""
    lines = text.split('\n')
    out: list[str] = []
    i = 0
    while i < len(lines):
        line = lines[i]
        out.append(line)
        if line.strip() == 'Copy and paste the following query into the Splunk search bar:':
            i += 1
            if i < len(lines) and lines[i].strip() == '':
                out.append(lines[i])
                i += 1
            q_lines: list[str] = []
            while i < len(lines):
                s = lines[i]
                if s.strip().startswith('Click the Search button'):
                    break
                if s.strip() != '':
                    q_lines.append(s.rstrip())
                i += 1
            spl = '\n'.join(q_lines)
            out.append('')
            out.append('```spl')
            out.append(spl)
            out.append('```')
            out.append('')
            if i < len(lines):
                out.append(lines[i])
            i += 1
            continue
        i += 1
    return '\n'.join(out)


def main() -> None:
    parts = docx_body_parts()
    full = parts_to_plain(parts)
    t6w = full.find('Task 3: Identifying Top Utilized Hosts')
    t7w = full.find('Task 4: Analyzing Top Flows — Who Accessed What, How, and For How Long')
    lab = full.find('Lab Summary')
    if t6w < 0 or t7w < 0 or lab < 0:
        raise SystemExit(
            'Could not find Task 3 (Top Hosts) / Task 4 (Top Flows) / Lab Summary markers in docx.'
        )
    if not (t6w < t7w < lab):
        raise SystemExit('Unexpected marker order in docx (expected Top Hosts < Top Flows < Lab Summary).')
    block6 = full[t6w:t7w].strip()
    block7 = full[t7w:lab].strip()

    b6 = block6.split('\n', 1)
    block6_md = '# Task 3: ' + b6[0].split(':', 1)[1].lstrip() + ('\n' + b6[1] if len(b6) > 1 else '')
    b7 = block7.split('\n', 1)
    block7_md = '# Task 4: ' + b7[0].split(':', 1)[1].lstrip() + ('\n' + b7[1] if len(b7) > 1 else '')

    task03 = wrap_spl_queries(block6_md)
    task04 = wrap_spl_queries(block7_md)

    (DOCS / 'task03.md').write_text(task03 + '\n', encoding='utf-8')
    (DOCS / 'task04.md').write_text(task04 + '\n', encoding='utf-8')
    print('Wrote', DOCS / 'task03.md', len(task03), 'chars')
    print('Wrote', DOCS / 'task04.md', len(task04), 'chars')


if __name__ == '__main__':
    main()
