# Secure Network Analytics — Cisco Live 2026 lab guide (MkDocs)

Static lab guide built with **MkDocs Material**, **mkdocs-macros**, and **glightbox**, following the same layout pattern as `pdu/DataCenter-power-mgmt-labguide-CL2026`.

## Quick start

```bash
cd sna/Secure-Network-Analytics-labguide-CL2026
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Open **http://127.0.0.1:8003** (see `dev_addr` in `mkdocs.yml`).

## Customize the lab

Edit **`data/lab_config.yaml`** only for:

- Lab ID, title, authors, event metadata
- SMC URL and GUI credentials
- Splunk dashboard URL and Splunk credentials
- Device IPs and SSH identities
- Host group name and CIDR
- Navigation (`nav`), learning objectives, related sessions

Use `{{ variable.path }}` in any `docs/*.md` page to reference keys from that file.

## Container build

```bash
podman build -t sna-labguide:latest -f Containerfile .
podman run -d --name sna-labguide -p 8003:8003 sna-labguide:latest
```

## Source draft

Lab narrative is derived from `sna/SNA Demo 4-17 First Draft.docx` / `sna/SNA Demo 4-17 First Draft.pdf`. Update the Markdown tasks under `docs/` when the draft changes.

## CI / publish

GitHub Actions only loads workflows from **`.github/workflows` at the repository root**. This monorepo keeps an example publish workflow under `pdu/DataCenter-power-mgmt-labguide-CL2026/.github/workflows/publish.yml`; copy that pattern to the repo root (or a dedicated repo) and set `defaults.run.working-directory` to `sna/Secure-Network-Analytics-labguide-CL2026` before `mkdocs build`.
