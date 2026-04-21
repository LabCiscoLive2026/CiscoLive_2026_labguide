# Task 4: Analyzing SEA01-103 NetFlow – Flow Search

After simulating network traffic within your SEA01-103 Host Group, you will now analyze the recently captured Netflow on the SNA Manager. Using Flow Search, you will generate a report that provides insight into the utilization of your SEA01-103 assets.

## Step 1: Accessing Flow Search in SNA Dashboard

- Open Google Chrome, enter or paste this URL in the search bar: https://10.0.13.50/
- Enter your username and password, then select Sign In.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

- Navigate to Investigate > Flow Search.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 2: Setting Flow Search Criteria

[Brief Summary/Purpose Flow Search] View laptop ip in asset utilization report

- Click the Time Range dropdown and select Last 24 hours

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

-  In the Port / Protocol field, enter each of the protocols below. To correctly enter them, you must type each individually, followed by pressing the Spacebar.
- 22/TCP > [Spacebar]
- 3389/TCP > [Spacebar]
- 8080/TCP > [Spacebar]
- 443/TCP > [Spacebar]

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

- In the Peer tile, under Host Groups, click Select.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

- In the side-panel, click (>) beside Inside Hosts to expand the dropdown, select SEA01-103 and then Apply.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

- Now that your Flow Search criteria are set, select Search to generate the results.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

A Flow Search can produce a substantial number of results, including information that may not be relevant. For your asset utilization report, you only want flow data related to the simulations completed in Task 3. With the filters on the result table, you can enter your IP Address that was noted down in the previous task, allowing you to quickly and effectively find only the necessary data.

- In the Subject IP Address filter, enter your laptop IP Address (Client Address IPv4) recorded in Task 3 – Step 1f.

!!! Note
    If you do not have your IP Address, open Cisco Secure Client and repeat Steps 1d – 1f. In the example, our IP Address was 172.30.255.10.

Now, the table should only be populated with flows from your own connection sessions. These Flow Search results can now be exported as a csv file containing the filtered data in the table

- Select Export, then Visible Columns, to download your asset utilization report.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

- Close the browser window to end your session.

## Result
You have successfully configured the host group and performed a flow search for the SEA01-103 to determine the device utilization. The flow data is collected by the flow collector and securely stored in the SMC Data Node. Next, we will review this data in Splunk, where our dashboard has been configured to connect directly to the Data Node database, enabling comprehensive visualization and analysis of the collected telemetry. This integration allows you to gain actionable insights into device utilization and network activity through the Splunk interface.

---