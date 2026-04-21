# Task 5: Splunk dashboard view of devices monitored by Cisco Secure Network Analytics

## Step 1: Accessing the SNA Access Count Dashboard

To ensure the best experience and consistent performance during your lab, please use the following instructions:

Dashboard Access:

To access the Data Center Dashboard, please use Google Chrome. Chrome is the preferred browser for this lab to ensure optimal dashboard functionality and system stability.

- Click on the link to access AI Era Power Management Dashboard on Chrome: Link
- Logging into the dashboard by using these credentials
    - Username:
    - Password:

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 2: Set the filter to SEAT01-103

Use the filter to set the Site as Seattle and Data Center as SEA01-103

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 3: Analyzing Access devices

This section of the interface provides real-time visibility into the data center inventory. Use the following metrics to monitor your environment:

- Total Devices: Displays the aggregate count of all devices currently provisioned or discovered within this data center. Use this to verify your baseline inventory.
- Accessed Devices: Provides a breakdown of the connection methods used for each device. Refer to this to confirm that devices are communicating through the expected protocols.
- Unaccessed Devices: Lists or quantifies devices that have not yet been reached or successfully connected to. Use this to identify potential connectivity issues or devices that require manual intervention.

Click any value in the panels to view the corresponding device list.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 4: Analyzing unaccessed Devices

These three panels display a list of devices that have remained unaccessed over the past 1, 3, and 6 months. You can use this data to identify stale inventory or devices that may require decommissioning.

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

!!! Tip
    Use the global filter at the top of the page to adjust the reporting window. Review the flowCount column to determine which hardware models are the most active in your data center.

## Result
In this task, you learned how to access and use the Splunk-based dashboard to monitor devices managed by Cisco Secure Network Analytics. By selecting the appropriate site and data center filters, you reviewed inventory metrics, identified which devices were accessed and which were not, and analyzed connectivity trends over different periods. Additionally, you explored the most frequently accessed device models to gain insight into operational activity within your data center.

---