# Lab Credentials

Use this page as the **single reference** for URLs, accounts, and device access used in this lab. Individual tasks may repeat a subset for convenience; if anything disagrees, **treat this page as correct**.

**On this page:** [VPN](#vpn-cisco-secure-client) · [SNA Management Console](#sna-management-console) · [Splunk Cloud](#splunk-cloud) · [Lab devices](#lab-devices) · [IPs in Splunk queries](#reference-lab-ips-in-splunk-queries)

!!! warning "Match User01 end-to-end"
    If you use **User01** (or another assigned seat) for **VPN**, use the **same** seat account for **PuTTY/SSH** and the password issued only for that user.

!!! tip "Task map"
    | Task | Credentials you need |
    | ---- | -------------------- |
    | **Task 1** | VPN → ISR/CAT9K **SSH** → CAT9K **HTTPS** |
    | **Task 2** | VPN **Client Address (IPv4)** for Flow Search → **SMC** |
    | **Tasks 3–4** | **Splunk Cloud** (Search & Reporting) |
    | **Task 5** | **Splunk Cloud** (SNA Asset Utilization dashboard) |

---

<a id="vpn-cisco-secure-client"></a>

## VPN — Cisco Secure Client

**Used in:** Task 1 (Step 1); Task 2 needs your VPN **Client Address (IPv4)** from **Status Overview** after you connect.

Connect with Cisco Secure Client **before** you SSH or open device HTTPS pages. After login, open **Status Overview** and record **Client Address (IPv4)** — Task 2 uses that value as the **Subject IP** filter in Flow Search.

| Field | Value |
| ----- | ----- |
| VPN address | `173.37.192.194` |
| Username | `user01@ciscolivevegas.com` |
| Password | `eaHZP_a8zphk*ty` |

---

<a id="sna-management-console"></a>

## SNA Management Console

**Used in:** Task 2 — **Flow Search** (`Investigate → Flow Search`).

| Field | Value |
| ----- | ----- |
| URL | `https://cl-smc-sna.cisco.com/sw-login/` |
| Username | `CiscoLive` |
| Password | `CL2026SNAandSplunkDemo!` |

---

<a id="splunk-cloud"></a>

## Splunk Cloud

**Used in:** Tasks 3–5 (Search & Reporting, SPL labs, and the SNA Asset Utilization dashboard).

All Splunk steps in this lab use the **same tenant and account** below.

| Field | Value |
| ----- | ----- |
| Username | `snauser-demo` |
| Password | `Ciscolive!135` |

### Splunk URLs

| Purpose | Link |
| ------- | ---- |
| **Search & Reporting** (Tasks 3–4) | [Open Search & Reporting](https://cisco-cx-calolabs.splunkcloud.com/en-US/app/search/search?earliest=-30m%40m&latest=now){target=_blank} |
| **SNA Asset Utilization** dashboard (Task 5) | [Open SNA Asset Utilization](https://cisco-cx-calolabs.splunkcloud.com/en-US/app/SNA_Real_Time_Asset_Utilization/sna_asset_utilization?form.time.earliest=-24h%40h&form.time.latest=now){target=_blank} |

---

<a id="lab-devices"></a>

## Lab devices

**Used in:** Task 1 (Steps 2–4).

| Host | Access | Address / URL | Username | Password |
| ---- | ------ | ------------- | -------- | -------- |
| ISR4K-CL (ISR4451) | SSH (TCP/22) | `10.0.13.70` | `aiera-user` | `Ciscolive!135` |
| CAT9K-CL (C9300) | SSH (TCP/22) | `10.0.13.71` | `aiera-user` | `Ciscolive!135` |
| CAT9K-CL (C9300) | HTTPS (TCP/443) | `https://10.0.13.71` | `aiera-user` | `Ciscolive!135` |

---

<a id="reference-lab-ips-in-splunk-queries"></a>

## Reference: lab IPs in Splunk queries

**Used in:** Tasks 3–4 (and similar SPL in optional task drafts). These addresses appear in example searches — they are **not** additional logins; they identify assets inside **SEA01-103** telemetry.

| IP address | Typical role in this lab |
| ---------- | ------------------------ |
| `10.0.13.70` | ISR4K-CL |
| `10.0.13.71` | CAT9K-CL |
| `10.0.13.50` | SNA Management Console (SMC) |
| `173.37.192.196` | SMC public IP (as used in sample SPL) |
| `10.0.13.3` | ESXi host |
| `10.0.13.10` | Ubuntu VM |
| `10.0.13.4` | LabGuide VM |

---
