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

The `Containerfile` sets **`HTTPS_PROXY` / `HTTP_PROXY`** to `http://proxy.esl.cisco.com:80` for the **build** stage so `pip` can reach PyPI from the Cisco network. Override or clear if you build elsewhere:

```bash
podman build -t sna-labguide:latest -f Containerfile .
# Without proxy:
# podman build --build-arg HTTPS_PROXY= --build-arg HTTP_PROXY= -t sna-labguide:latest -f Containerfile .
```

Nginx serves the static site on **8443** inside the container:

```bash
podman run -d --name sna-labguide -p 8443:8443 sna-labguide:latest
```

## Source draft

Lab narrative is synced from `sna/SNALabv2.docx` (author draft). Update the Markdown under `docs/` when that document changes. Optional helper `scripts/extract_sna_labv2_tasks.py` **overwrites** `docs/task03.md` and `docs/task04.md` with plain Word text (you must re-apply `spl-lab-scroll`, figure blocks, and tables)—prefer hand-editing those pages unless you are regenerating from a fresh docx.

## CI / publish

GitHub Actions only loads workflows from **`.github/workflows` at the repository root**. This monorepo keeps an example publish workflow under `pdu/DataCenter-power-mgmt-labguide-CL2026/.github/workflows/publish.yml`; copy that pattern to the repo root (or a dedicated repo) and set `defaults.run.working-directory` to `sna/Secure-Network-Analytics-labguide-CL2026` before `mkdocs build`.
