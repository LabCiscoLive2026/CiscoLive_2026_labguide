# Task 5: Splunk dashboard view of devices monitored by Cisco Secure Network Analytics

!!! warning "REVISIT: dashboard name and deep link"
    The draft still references **“AI Era Power Management Dashboard”** and a placeholder **“Link.”** Replace both with the **SNA Access Count** (or equivalent) Splunk **URL**, title, and login flow for the tenant before class.

## Step 1: Accessing the SNA Access Count dashboard

!!! tip "Use Chrome"
    Run Splunk dashboards in **Google Chrome** for the most predictable layout and performance in the lab.

Use the credentials your proctor supplies (see **Credentials** if blanks were filled in). Open the Splunk deep link when it is published -> **REVISIT:** insert the real URL and remove the legacy bullet below when content is final.

- **Dashboard (placeholder):** Link *(replace with Splunk app/view URL)*
- **Sign-in:** use the lab Splunk username and password.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 2: Set filters for site and data center

!!! note "REVISIT: spelling in UI"
    The draft heading uses **SEAT01-103**; the lab host group is **SEA01-103**. Match **whatever labels the Splunk dashboard actually shows** (site **Seattle**, data center **SEA01-103** unless your tenant differs).

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 3: Analyzing accessed devices

!!! note "Panel drill-down"
    Treat the headline numbers as **entry points**. Click a metric when the UI offers a detail list so you move from **counts** to **specific devices** before drawing conclusions.

This section summarizes inventory health. Use the following metrics to orient yourself:

- Total Devices: Displays the aggregate count of all devices currently provisioned or discovered within this data center. Use this to verify your baseline inventory.
- Accessed Devices: Provides a breakdown of the connection methods used for each device. Refer to this to confirm that devices are communicating through the expected protocols.
- Unaccessed Devices: Lists or quantifies devices that have not yet been reached or successfully connected to. Use this to identify potential connectivity issues or devices that require manual intervention.

Click any value in the panels to view the corresponding device list.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 4: Analyzing unaccessed devices

!!! important "Interpret “unaccessed” carefully"
    “Unaccessed” here means **no successful access in the dashboard’s definition** for that window—not automatically “unused hardware.” Pair with change tickets and physical validation before decommission ideas. **REVISIT:** Align wording with how the Splunk panel labels the metric.

These three panels list devices with no access in the **1-, 3-, and 6-month** windows the dashboard defines. Use them as a **triage list** for follow-up, not as a sole source of truth.

- 1-Month View: Identifies devices with recent connectivity issues.
- 3-Month View: Highlights devices that have been inactive for a full quarter.
- 6-Month View: Indicates long-term inactive devices that may no longer be in use.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 5: Analyzing Top Accessed Product IDs (PIDs)

This table displays the most frequently accessed device PIDs based on the timeframe selected in the global filter.

- PID: The unique Product ID of the device model.
- flowCount: The total number of times devices with this PID were accessed during the selected period.

!!! tip "Reading the PID table"
    Change the **global time range** at the top before comparing models. Sort or scan **flowCount** to see which **PIDs** saw the most access in the window -> useful for spotting heavily touched platforms vs. long-tail gear.

## Result
In this task, you learned how to access and use the Splunk-based dashboard to monitor devices managed by Cisco Secure Network Analytics. By selecting the appropriate site and data center filters, you reviewed inventory metrics, identified which devices were accessed and which were not, and analyzed connectivity trends over different periods. Additionally, you explored the most frequently accessed device models to gain insight into operational activity within your data center.

---