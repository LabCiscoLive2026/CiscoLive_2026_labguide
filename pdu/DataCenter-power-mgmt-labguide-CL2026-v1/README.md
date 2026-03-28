# Data Center Power Management — Lab Guide

## Quick Start

```bash
# Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Preview the lab guide locally
mkdocs serve

cd /Users/rbhaviri/Documents/Ongoing/labguide/DataCenter-power-mgmt-labguide-CL2026
podman build -t labguide:latest -f Containerfile .

podman run -d --name labguide -p 8002:8002 labguide:latest

podman ps                 # check status
podman logs labguide      # view nginx logs
podman stop labguide      # stop
podman start labguide     # restart
podman rm labguide        # remove (must stop first)

podman stop labguide && podman rm labguide
podman build -t labguide:latest -f Containerfile .
podman run -d --name labguide -p 8002:8002 labguide:latest

podman generate systemd --name labguide --new > ~/.config/systemd/user/labguide.service
systemctl --user daemon-reload
systemctl --user enable labguide.service
```

Open <http://localhost:8000> to view the lab guide.

## How to Customize

**All lab-specific data lives in one file:**

```
data/lab_config.yaml
```

Edit that file to change:

| What                     | Config key            |
|--------------------------|-----------------------|
| Lab ID & title           | `lab_id`, `lab_title` |
| Author names             | `authors`             |
| Event name               | `event_name`          |
| Jumphost credentials     | `jumphost.*`          |
| Device credentials       | `device_credentials.*`|
| Page navigation          | `nav`                 |
| Related sessions         | `related_sessions`    |
| Learning objectives      | `learning_objectives` |
| Any custom variable      | add it at the bottom  |

After editing, restart `mkdocs serve` to see changes.

## Using Variables in Markdown

Any key in `data/lab_config.yaml` can be referenced inside `.md` files
using double curly braces:

```markdown
Connect to the jumphost at {{ jumphost.ip }}
with username {{ jumphost.username }}.
```

## Project Structure

```
data/
  lab_config.yaml      ← THE file to edit (single source of truth)
docs/
  index.md             ← Home page
  overview.md          ← Lab overview & learning objectives
  getting_started.md   ← VPN / RDP / device access instructions
  task01.md … task04.md← Lab task pages
  conclusion.md        ← Summary & related sessions
  ip_addresses.md      ← Device IP address tables
  assets/              ← Images and diagrams
  overrides/           ← MkDocs theme overrides (advanced)
  stylesheets/         ← Custom CSS
hooks/
  config.py            ← Reads lab_config.yaml → sets site name, nav, etc.
mkdocs.yml             ← Technical settings (theme, plugins) — rarely edited
requirements.txt       ← Python dependencies
```


#  This is the ONLY file you need to edit to customize your lab guide.
#  After making changes, run:  mkdocs serve
#
#  TIPS:
#    - Wrap text in quotes if it contains special characters like : # [ ]
#    - Indentation matters — use spaces, not tabs
#    - Lines starting with # are comments (ignored by the system)



!!! note
    This is a note about a specific feature.

!!! tip
    Use this shortcut to save time during configuration.

!!! warning
    Incorrect phase configuration can lead to breaker trips.


## Access Credentials

You will use two systems during this lab:

### Smart PDU (Raritan)

| <!-- -->     | <!-- -->                   |
| ------------ | -------------------------- |
| `URL`        | [{{ smart_pdu.url }}]({{ smart_pdu.url }}) |
| `Username`   | {{ smart_pdu.username }}   |
| `Password`   | {{ smart_pdu.password }}   |

### Splunk Cloud

| <!-- -->     | <!-- -->                   |
| ------------ | -------------------------- |
| `Username`   | {{ splunk.username }}      |
| `Password`   | {{ splunk.password }}      |

!!! note
    Splunk Cloud credentials will be provided on the landing page. Click **Cisco Splunk Cloud Login** to proceed to the Splunk login screen.


!!! info
    Not all rows have Meraki sensors installed. If you see "No results found," select a different row that has sensor coverage.



- Navigating Smart PDU interfaces for real-time power metrics
- Using Splunk Cloud dashboards for data center power monitoring
- Visualizing power flow topology from transformers to racks
- Monitoring environmental conditions with Meraki sensor data
- Tracking PDU fleet status and availability
- Analyzing outlet-level power distribution and phase balancing
- Querying power and environmental data programmatically using the CLI script

cd /Users/rbhaviri/Documents/Ongoing/labguide/DataCenter-power-mgmt-labguide-CL2026
podman build -t labguide:latest -f Containerfile .

podman run -d --name labguide -p 8002:8002 labguide:latest

podman ps                 # check status
podman logs labguide      # view nginx logs
podman stop labguide      # stop
podman start labguide     # restart
podman rm labguide        # remove (must stop first)

podman stop labguide && podman rm labguide
podman build -t labguide:latest -f Containerfile .
podman run -d --name labguide -p 8002:8002 labguide:latest

podman generate systemd --name labguide --new > ~/.config/systemd/user/labguide.service
systemctl --user daemon-reload
systemctl --user enable labguide.service