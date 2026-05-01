# Task 5: Splunk Dashboard View of Devices Monitored by Cisco Secure Network Analytics

In this task, you will use **Splunk Cloud** to view pre-built **dashboards** that visualize **asset utilization** data collected by **Cisco Secure Network Analytics**. These **dashboards** provide high-level visibility into your **data center** environment — making it easy to determine which devices are actively being accessed, what protocols are being used, and which devices remain idle. This information is critical for identifying **underutilized assets**, supporting **sustainability initiatives**, and making room for **next-generation infrastructure** such as **AI deployments**.

**The dashboards** leverage the same **NetFlow** telemetry you verified in **Task 4**, now presented through


## Step 1: Access the Splunk Cloud dashboard

!!! tip "Use Chrome"
    Run **Splunk** dashboards in **Google Chrome** for the most predictable layout and performance in the lab.

1. Open **Google Chrome** and navigate to the following **Splunk Cloud** dashboard URL:

| Field | Value |
| ----- | ----- |
| URL | [https://cisco-cx-calolabs.splunkcloud.com/en-US/app/SNA_Real_Time_Asset_Utilization/sna_asset_utilization](https://cisco-cx-calolabs.splunkcloud.com/en-US/app/SNA_Real_Time_Asset_Utilization/sna_asset_utilization?form.time.earliest=-24h%40h&form.time.latest=now) |
| Username | `snauser-demo` |
| Password | `Ciscolive!135` |

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk SNA asset utilization dashboard](./assets/task1/1.png)
</figure>
</div>

## Step 2: Set Site and Data Center filters

1. At the top of the dashboard, locate the **Site** and **Data Center** filter dropdowns.
2. Set the filters to the following values:

    - Site: **Seattle**
    - Data Center: **SEA01-103**

3. Click **Sign In**.

!!! warning "Match labels exactly"
    Ensure you select **SEA01-103**. Match the labels exactly as displayed in the **Splunk** dashboard.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk dashboard filters](./assets/task1/1.png)
</figure>
</div>

## Step 3: Review the Device Utilization summary

At the top of the dashboard, **three color-coded panels** provide an immediate snapshot of your data center's **asset utilization** status.

| Panel | Color | Value | What It Means |
| ----- | ----- | ----- | ------------- |
| Total Devices | Yellow | 18 | The total number of devices provisioned or discovered in the **SEA01-103** data center. This is your complete inventory baseline. |
| Accessed Count | Green | 8 | The number of devices that have been actively accessed within the **last 24 hours**. These devices are confirmed to be in use. |
| UnAccessed Devices | Green (Dark) | 10 | The number of devices with no recorded access in the **last 24 hours**. These are potential candidates for further investigation. |

1. Observe the three summary panels and note the ratio: out of 18 total devices, only 8 were accessed — meaning over half (10 devices) had no recorded activity in the **last 24 hours**.
2. This immediately tells you that a significant portion of your **data center assets** may be **underutilized**, **idle**, or potentially candidates for **decommissioning** or **repurposing**.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk device utilization summary](./assets/task1/1.png)
</figure>
</div>

## Step 4: Analyze accessed devices

Scroll down to the **Accessed Device** table. This table provides detailed information about every device that was accessed within the **selected time window**.

The table contains the following columns:

| Column | Description |
| ------ | ----------- |
| Data Center | The data center where the device resides (**SEA01-103**) |
| Asset Type | The type or model of the device (e.g., VM, ISR4451-X/K9, C9300X-48HX) |
| EITMS/SERIAL_NUMBER | The unique serial number identifying the specific device |
| Source IP | The IP address of the device or user that initiated the connection |
| Destination IP | The IP address of the device that was accessed |
| Protocol/Port | The protocol and port used for the connection |
| No of Sessions | The number of flow sessions recorded for this connection |
| Total Bytes | The total volume of data transferred |
| Duration | The time span of the access activity |

1. Review the accessed devices and note the following observations from the dashboard:

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk accessed devices](./assets/task1/1.png)
</figure>
</div>

2. Note the key insights from the accessed devices:

    - **Highest utilization:** The VM at `10.0.13.4` (LabGuide VM) dominates with 74.31 GB transferred over 20.42 hours across 20 sessions using TCP/9200 — indicating heavy application-level traffic.
    - **Network device access:** The ISR4451-X/K9 at `10.0.13.70` was accessed via SSH (TCP/22) with 5 sessions over 6.58 hours
    - **Switch access:** The C9300X-48HX at `10.0.13.71` was accessed via HTTPS (TCP/443) — indicating web-based management access.
    - **SMC activity:** The **SNA Management Console** at `10.0.13.50` shows UDP/27017 traffic — this is internal **SNA** database communication.
    - **ESXi Host:** The UCS-M5S ESXI at `10.0.13.3` used for management

## Step 5: Analyze unaccessed devices

Scroll down to the **UnAccessed Devices** table. This is where the real **asset utilization** story unfolds — these are the 10 devices that had zero recorded access in the **last 24 hours**.

1. Review the unaccessed devices and note the following:

    - All 10 devices show zero sessions, zero bytes, and zero duration — confirming complete inactivity.
    - All 10 devices are monitored via SSH — meaning they are expected to be managed remotely, but no one has connected to them.
    - The devices span a range of Cisco platforms including Catalyst 9000 series switches, ISR routers, Firepower appliances, and Nexus switches.
    - Each device resides in a different data center designation (**SEA01-121** through **SEA01-130**), suggesting these are distributed assets across multiple zones.

2. Consider what this means for your organization:

    - 10 out of 18 devices (55.6%) in this environment are completely idle.
    - These devices are consuming power, cooling, and rack space without contributing to any active workloads.
    - This is exactly the type of insight that drives **sustainability** decisions — by identifying these idle assets, organizations can consolidate workloads, decommission unused hardware, and free up physical resources for **AI deployments** and **next-generation infrastructure**.

!!! important
    **"Unaccessed"** means no access was recorded in the **selected time window**. Before taking any action, always validate with:

    - **Device owners**
    - **Physical inspection**

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Splunk unaccessed devices](./assets/task1/1.png)
</figure>
</div>

## Result

In this task, you explored the **SNA Asset Utilization** dashboard on **Splunk Cloud** and gained a complete picture of **asset utilization** across the **SEA01-103** data center:

- **18** total devices are provisioned in the environment
- **8** devices (**44.4%**) were actively accessed in the **last 24 hours** — confirmed through **flow telemetry** showing protocols, session counts, bytes transferred, and duration
- **10** devices (**55.6%**) had zero recorded access — representing idle assets consuming power, cooling, and rack space with no active workloads
- **Device Flow Count** revealed that utilization is heavily concentrated on a few key devices, with the **LabGuide VM** alone accounting for over **74 GB** of traffic

This dashboard proves the value of combining **Cisco Secure Network Analytics** with **Splunk Cloud** for **asset utilization** monitoring. In a **real-world data center**, this visibility enables operators to identify idle hardware, consolidate workloads, reduce energy consumption, and reclaim physical resources — directly supporting **sustainability goals** and creating capacity for **AI** and **next-generation infrastructure** deployments.

---
