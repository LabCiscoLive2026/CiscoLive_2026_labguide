# Lab User Credentials

Use these tables while you work through the lab. If your session uses **numbered seats** (User01, User02, …), stay on the **same seat** for VPN and for SSH so passwords line up with the matrix your proctor publishes.

!!! warning
    If you use User01 for VPN access, you must use the corresponding User01 for PuTTY/SSH access and the password associated only with it.

## VPN — Cisco Secure Client

For: (Task 3, Step 1)

Connect with Cisco Secure Client **before** you SSH or open device HTTPS pages. After a successful login, open **Status Overview** and record **Client Address (IPv4)**; Task 4 uses that value as the Subject IP filter in Flow Search.

| <!-- -->      | <!-- -->                    |
| ------------- | --------------------------- |
| `VPN address` | `173.37.192.194`            |
| `Username`    | `user01@ciscolivevegas.com` |
| `Password`    | `eaHZP_a8zphk*ty`           |

## SNA Manager — web sign-in and Flow Search

For: (Task 4, Step 1)

Open the URL in **Chrome**, sign in, then use **Investigate → Flow Search** when Task 4 tells you to run a search against **SEA01-103**.

| <!-- -->   | <!-- -->              |
| ---------- | --------------------- |
| `URL`      | `https://10.0.13.50/` |
| `Username` | `aiera-user`          |
| `Password` | `Ciscolive!246???`    |

## Lab device — ISR4K-CL over SSH

For: (Task 3, Step 2)

SSH to the ISR4451 management address below (PuTTY or any terminal). Use `aiera-user` / `Ciscolive!135`, run the CLI steps in the task (for example `show ip interface brief`), then exit so flows are visible in SNA.

| <!-- -->        | <!-- -->        |
| --------------- | --------------- |
| `Host Name`     | `ISR4K-CL`      |
| `Mgmt IP`       | `10.0.13.70`    |
| `Access Method` | `SSH`           |
| `Username`      | `aiera-user`    |
| `Password`      | `Ciscolive!135` |

## Lab device — CAT9K-CL over SSH

For: (Task 3, Step 3)

Same SSH pattern as the ISR, on the C9300 management IP. Generate another round of CLI traffic so both assets appear in NetFlow for **SEA01-103**.

| <!-- -->        | <!-- -->        |
| --------------- | --------------- |
| `Host Name`     | `CAT9K-CL`      |
| `Mgmt IP`       | `10.0.13.71`    |
| `Access Method` | `SSH`           |
| `Username`      | `aiera-user`    |
| `Password`      | `Ciscolive!135` |

## Lab device — CAT9K-CL over HTTPS

For: (Task 3, Step 4)

Use **Chrome** to the HTTPS URL below. Sign in with the **full UPN** on the username row, browse briefly, then log out as the task describes so HTTPS flows are captured alongside SSH.

| <!-- -->        | <!-- -->                        |
| --------------- | ------------------------------- |
| `Host Name`     | `CAT9K-CL`                      |
| `Mgmt IP`       | `10.0.13.71`                    |
| `Access Method` | `HTTPS`                         |
| `Username`      | `aiera-user@ciscolivevegas.com` |
| `Password`      | `Ciscolive!135`                 |

## Splunk — SNA Access Count dashboard and Search & Reporting

For: (Task 5, Step 1), (Task 6), (Task 7)

Use the same Splunk Cloud tenant for the **SNA Access Count** dashboard (**Task 5**) and for **Search & Reporting** ad hoc searches (**Tasks 6–7**). Splunk **Username** and **Password** are intentionally blank in the lab draft. When the event publishes Splunk tenant credentials, type them into your copy of this guide or keep them on the printed seat card—do not commit real secrets to source control.

| <!-- -->   | <!-- --> |
| ---------- | -------- |
| `Username` | `CiscoLive_2026`         |
| `Password` | `CiscoLive345!SNA_demo`        |

---
