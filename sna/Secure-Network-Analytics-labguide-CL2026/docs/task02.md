# Task 2: Analyzing SEA01-103 NetFlow – Flow Search


After simulating network traffic within your **SEA01-103** host group in **Task 1**, you will analyze the recently captured NetFlow data on the SNA Manager using **Flow Search**. You will build a targeted search to isolate flows related to your lab traffic, filter results to your workstation, and optionally export the data as a CSV for offline asset-utilization review.

Flow Search provides an on-box way to investigate network conversations—complementing the Splunk-based analysis in later tasks.

## Step 1: Access Flow Search on the SNA Manager

- Open **Google Chrome**.
- Go to the **SNA Manager** URL in **`creds.md`** (Flow Search). Sign in with the **SNA Manager** username and password from that page.
- From the top navigation menu, choose **Investigate → Flow Search**.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task4/1.png)
</figure>
</div>

## Step 2: Set the time range

- Open the **Time Range** control and select **Last 5 minutes** (or **Last 24 hours** if your proctor asks for a wider window so flows are easier to find).

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task4/2.png)
</figure>
</div>

## Step 3: Enter Port / Protocol values

!!! tip "Port / Protocol tokens"
    Enter each **Port/Protocol** value (for example `22/TCP`), press **Space** to commit it as a chip (token), then type the next. The UI must show **separate** tokens—not one long concatenated string.

In the **Port / Protocol** field, enter each value below **one at a time**, pressing **Space** after each so it becomes its own token:

| Entry | Action |
| --- | --- |
| 22/TCP | Type `22/TCP`, then press **Space** |
| 3389/TCP | Type `3389/TCP`, then press **Space** |
| 8080/TCP | Type `8080/TCP`, then press **Space** |
| 443/TCP | Type `443/TCP`, then press **Space** |

After all four entries, confirm you see **four distinct tokens** in the field.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task4/3.png)
</figure>
</div>

## Step 4: Select the SEA01-103 host group

- In the **Peer** tile, under **Host Groups**, click **Select**.
- In the side panel, expand **Inside Hosts** (click **>**).
- Select **SEA01-103**, then click **Apply**.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task4/4.png)
</figure>
</div>

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task4/5.png)
</figure>
</div>

## Step 5: Run the Flow Search

With the criteria set, click **Search** to run the query. Confirm the time range still matches what you selected in Step 2.

!!! tip "Large result sets"
    Flow Search can return many rows, much of it unrelated to **your** lab traffic. In the next step you narrow the grid to your client IP.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task4/6.png)
</figure>
</div>

## Step 6: Validate your network activity

- In the **Subject IP** filter, enter the **Client Address (IPv4)** you recorded in **Task 1** (Cisco Secure Client **Status Overview** after VPN connects).

!!! note "Lost your client IPv4?"
    Reopen **Cisco Secure Client** and open **Status Overview** again (same path as **Task 1**). Copy **Client Address (IPv4)**. Example shape: `172.30.255.11`—**yours will differ.**

After you apply **Subject IP**, the grid should refresh to flows tied to **your** sessions. Confirm you see activity for the protocols you generated in **Task 1**, for example:

| Protocol/Port | Service | Expected activity |
| --- | --- | --- |
| 22/TCP | SSH | Shell access to lab devices (for example ISR4K-CL, CAT9K-CL, Ubuntu VM) |
| 3389/TCP | RDP | Remote Desktop to Windows lab targets (if used) |
| 8080/TCP | HTTP | Web access to the LabGuide VM |
| 443/TCP | HTTPS | Secure web or device management (for example CAT9K-CL, SMC, ESXi) |

To keep a copy for offline review, export what is on screen:

- Choose **Export → Visible Columns** (or the export option your UI shows) to download a **CSV** of the filtered grid.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task4/7.png)
</figure>
</div>

- Close the browser window when you are finished.

## Result

Review the data and confirm:

- **Source IPs** — Do they align with **your** **Client Address (IPv4)** from **Task 1**?
- **Destination IPs** — Do they correspond to devices inside **SEA01-103**?
- **Protocols** — Do you see **SSH (22/TCP)**, **HTTP (8080/TCP)**, and **HTTPS (443/TCP)** where you expect, plus **RDP (3389/TCP)** if you used it?
- **Time range** — Do **Start Time** and **End Time** fall in the window when you generated traffic in **Task 1**?

By retrieving flow records that match the traffic you generated in **Task 1**, you show that Cisco Secure Network Analytics captures NetFlow telemetry suitable for asset-utilization visibility—who accessed which device, over which protocol, how much data moved, and when.

---
