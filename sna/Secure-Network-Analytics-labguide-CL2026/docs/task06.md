# Task 6: Asset Utilization at Scale

This dashboard represents a **real-world deployment** spanning **8 sites** and **16 data centers**, demonstrating how Cisco Secure Network Analytics and Splunk can be used together to monitor asset utilization at scale.

## To access the full-scale dashboard

- Open **Google Chrome** and navigate to the following **Splunk Cloud** dashboard URL:

| Field | Value |
| ----- | ----- |
| URL | [https://cisco-cx-calolabs.splunkcloud.com/en-US/app/SNA_Real_Time_Asset_Utilization/real_time_visibility_into_asset_utilization](https://cisco-cx-calolabs.splunkcloud.com/en-US/app/SNA_Real_Time_Asset_Utilization/real_time_visibility_into_asset_utilization){target=_blank} |
| Username | `snauser-demo` |
| Password | `Ciscolive!135` |

- Once logged in, browse through the dashboard by selecting different **sites**, **data centers**, **asset types**, and **time ranges** using the filters at the top of the dashboard.


- As you explore, observe how:

    - **Asset utilization patterns** vary across different sites and data centers
    - **UnAccessed device tables** highlight idle assets across 1-month, 3-month, and 6-month time windows
    - **Summary panels** (Total Devices, Accessed Devices, UnAccessed Devices) provide an at-a-glance health check for each site
    - **Most Accessed Asset Types** chart shows how access is distributed across different device categories

| Filter | Options |
| ------ | ------- |
| Site | Select from any of the **8** available sites |
| Data Center | Drill into any of the **16** data centers |
| Asset Type | Filter by specific device categories |
| Time | Adjust the time window (e.g., Last 24 Hours, Last 7 Days) |


## As you browse across different sites and data centers, consider the following:

- Which site has the highest number of unaccessed devices?
- Are there common asset types that appear as unaccessed across multiple data centers?
- How do access patterns differ between data centers within the same site?
- Can you identify assets that have been idle for 6 months that could be candidates for decommissioning?

!!! tip "Key Takeaway"
    This scaled dashboard demonstrates how NetFlow telemetry collected by Cisco Secure Network Analytics can be transformed into a powerful operational tool when combined with Splunk's visualization capabilities. By extending the same flow-based analysis across **8 sites** and **16 data centers**, organizations can proactively identify underutilized assets, validate access patterns, and make informed decisions about capacity planning and resource optimization — all from a single unified dashboard monitoring thousands of assets in real time.
