# Task 5: Splunk dashboard view of devices monitored by Cisco Secure Network Analytics

## Step 1: Access the Splunk Cloud dashboard

!!! tip "Use Chrome"
    Run Splunk dashboards in **Google Chrome** for the most predictable layout and performance in the lab.

Open Google Chrome and go to the Splunk Cloud dashboard (deep link from the latest lab package):

`https://cisco-cx-calolabs.splunkcloud.com/en-US/app/SNA_Real_Time_Asset_Utilization/sna_asset_utilization?form.time.earliest=-24h%40h&form.time.latest=now`

Sign in with the **Splunk** username and password your proctor provides (see **Credentials**; values may be distributed at the event rather than in `lab_config.yaml`).

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk SNA asset utilization dashboard](./assets/task1/1.png)
</figure>
</div>

## Step 2: Set Site and Data Center filters

At the top of the dashboard, locate the **Site** and **Data Center** filter controls.

Set:

- **Site:** Seattle  
- **Data Center:** SEA01-103  

!!! warning "Match labels exactly"
    Choose **SEA01-103** exactly as the dashboard labels it (not **SEAT01-103** or other typos).

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk dashboard filters](./assets/task1/1.png)
</figure>
</div>

## Step 3: Review the Device Utilization summary

At the top of the dashboard, three summary panels give a snapshot of asset utilization for the selected site and data center.

Read the **total**, **accessed**, and **unaccessed** counts. The draft narrative uses an example of **18** total devices with **8** accessed and **10** unaccessed—**your live numbers may differ** with current telemetry.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk device utilization summary](./assets/task1/1.png)
</figure>
</div>

## Step 4: Analyze accessed devices

Click the **Accessed** count (or the panel your UI exposes) and open the **Accessed devices** detail or table.

Review which assets show sessions and bytes. The Word draft calls out examples such as strong utilization on **10.0.13.4** (LabGuide VM), SSH to **10.0.13.70** (ISR), HTTPS management to **10.0.13.71** (Catalyst), and SMC-related traffic on **10.0.13.50**—use them as **patterns** to look for, not guaranteed values.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk accessed devices](./assets/task1/1.png)
</figure>
</div>

## Step 5: Analyze unaccessed devices

Scroll to the **Unaccessed devices** (or equivalent) table.

The draft emphasizes that “unaccessed” means **no access recorded in the selected time window**, not automatically “unused hardware.” Before acting on idle-looking assets, validate with owners, change windows, and physical checks.

Consider:

- How many devices show **zero** sessions or bytes in the window?
- Whether those systems are still in service, powered, or intentionally quiet.

!!! important "Interpret “unaccessed” carefully"
    Treat idle lists as **triage**, not decommission orders. Always confirm with operational owners and a wider time range when the dashboard allows it.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk unaccessed devices](./assets/task1/1.png)
</figure>
</div>

## Result

In this task you explored the **SNA asset utilization** view in Splunk Cloud: you set site and data center context, read summary counts, drilled into **accessed** versus **unaccessed** assets, and related the story to capacity, security, and sustainability discussions. The exact counts and device names depend on your tenant and the lab window—focus on the **workflow** the dashboard supports.

---
