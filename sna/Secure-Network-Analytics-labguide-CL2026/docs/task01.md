# Task 1: SNA Appliance Setup – Central Management

In this task, we will demonstrate how to navigate the SNA dashboard’s Central Management tool and view the status and settings of the virtual appliances that comprise your data center’s SNA environment. Each virtual appliance plays a vital role in this system, and it is crucial to verify they are correctly configured and operational. Through this process, you will be familiarized with the essential components of SNA and confirm that your deployment is ready to collect and monitor flow data.

## Step 1: Accessing the SNA Dashboard

In Task 1-2, no admin access to configure these settings, later in task 4.

- Enter your username and password, then click Sign In

[IMAGE]

## Step 2: Navigating to Central Management

Central Management is the centralized management console for your SNA virtual appliances. It is a tool that provides full control over each appliance and detailed insight into their operations. Using Central Management, you will be able to edit your appliance settings and view their analytics data.

- In the sidebar, navigate to Configure > Central Management

[IMAGE]

## Step 3: Verifying Virtual Appliance Status

To ensure your SNA environment is operational, you will check the status of each virtual appliance in the Inventory tab. This tab is the default view for Central Management.

- In the Appliance Status column, verify that each appliance is Connected. [3a]

[IMAGE]

!!! Note
    The three core appliances of SNA architecture, which your environment mirrors, are as follows:

    - Secure Network Analytics Manager: Provides the graphical user interface for managing the SNA environment and analyzing captured data.
    - Data Node: Acts as the storage repository for captured data.
    - Flow Collector: Responsible for collecting and forwarding network telemetry to the Data Node.

!!! danger "Critical"
    When bringing an SNA environment online, it is essential that the appliances are deployed in the correct order. Failure to do so will prevent them from connecting to the SNA Manager, rendering the environment non-operational. The correct order of deployment is SNA Manager > Data Node > Flow Collector.

## Step 3: Verifying Data Node Status

The Data Node is an appliance that stores, indexes, and retrieves the flow data captured by Flow Collectors. The data center generates a vast amount of network traffic, so a dedicated storage component is imperative to your SNA environment. While the information is physically stored on the Data Node, it resides logically in a database. For the database to be accessible, the Data Node must also be online and connected. You will check the Data Store page to view the operational status of both the Data Node and database.

- In the banner, navigate to Data Store. The default view is the Database Control tab.
- Under Database Status, verify it is Up.
- Under Data Node Status, verify it is Up.

[IMAGE]

!!! Note

    The Data Store is a central database, consisting of one or more Data Node[s], that stores, indexes, and retrieves the captured network telemetry. Your Data Store is made up of only one appliance, but the clustering of multiple Data Nodes provides high-availability and can improve both fault tolerance and query-response times.

## Step 5: Verifying Retention Period

One of the benefits that SNA offers is the ability to analyze historical data, but it also allows you to decide how long you will hold onto that data. By configuring the Store Flow Interface Data policy, a retention period can be set that meets your data center’s needs. You plan to locally store your SNA’s historical data locally in the Splunk index, so a seven-day retention policy will be adequate here.

- Navigate to Database Retention.
- Under Store Flow Interface Data, verify that Up to (days) is selected, and the value is 7.

[Edit Picture Full Screen, but don’t need to scroll to view bottom green box]

[IMAGE]

## Result

**Summary:**  
In this task, you accessed the SNA dashboard and used the Central Management tool to review the health and connectivity of the virtual appliances forming your SNA environment. You verified that all appliances (Manager, Data Node, Flow Collector) are connected and operational, ensured the Data Node and its database are running, and confirmed that flow data retention is set correctly (7 days). Successfully completing these steps prepares your environment for reliable collection and monitoring of network flow telemetry.

---