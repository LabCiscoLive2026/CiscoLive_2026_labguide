# Task 3: Simulating Asset Utilization Using NetFlow

To verify the SNA environment is capturing NetFlow as intended, you will access SEA01-103 data center assets via SSH and HTTPS to generate network traffic data. By simulating network traffic with multiple access protocols, you will

## Step 1: Connecting to the VPN

For this task, you will need to connect to the lab environment through our VPN.

- Open Cisco Secure Client, enter the VPN address: 173.37.192.194 and select Connect.

[IMAGE]

- If prompted with a security warning, select Connect Anyway to proceed.

[IMAGE]

- Enter the credentials listed below and select OK to connect

[IMAGE]


- After successfully connecting, reopen Cisco Secure Client and select: [Settings Icon]

[IMAGE]

- Navigate to Status Overview
- Note down the IP Address next to Client Address (IPv4). You will need to reference it later in the next Task. In the example, the IP Address is 172.30.255.10.

[IMAGE]

## Step 2: Accessing the Device: ISR4K-CL via SSH

The first asset in the SEA01-103 data center that you will access is a Cisco ISR4451 router. Using PuTTY, you will connect to the command-line interface via SSH. The access information is provided below.

[IMAGE]

- Open PuTTY, then enter 10.0.13.70 in the Host Name (or IP Address) field.
- Verify that Port is 22 and Connection type: is SSH, then select Open.

[IMAGE]

- The asset terminal will open. At the login prompt, enter the username: aiera-user and press Enter.

[IMAGE]

- At the password prompt that follows, enter the password: Ciscolive!135 and press Enter. When entered correctly, you will see the enable prompt for ISR4K-CL.

[IMAGE]

- At the enable prompt, enter the command: show ip interface brief and press Enter to simulate additional network traffic to this asset. [Edit Picture]

[IMAGE]

- Close the terminal window to exit the session.

## Step 3: Accessing CAT9K-CL via SSH

The next SEA01-103 asset that you will access is a Cisco C9300X-48HX switch. Using PuTTY, you will connect to the command-line interface via SSH. The access information is provided below.


- Open PuTTY, then enter 10.0.13.71 in the Host Name (or IP Address) field.
- Verify that Port is 22 and Connection type: is SSH, then select Open.

[IMAGE]

- The asset terminal will open. At the login prompt, enter the username: aiera-user and press Enter.
- At the password prompt, enter the password: Ciscolive!135 and press Enter. When entered correctly, you will arrive at the enable prompt for CAT9K-CL.
- At the enable prompt, enter the command: show ip interface brief and press Enter to simulate additional network traffic to this asset. [edit picture]

[IMAGE]

- Close the terminal window to exit the session.

## Step 4: Accessing CAT9K-CL via HTTPS

You will access CAT9K-CL again, but through the HTTPS protocol this time. Using varied access protocols, you will test the SNA’s capability to organize flow data by fields other than IP Address. The assets access information is listed below.

[IMAGE]

- Open Google Chrome, enter or paste the URL: https://10.0.13.71 into the search-bar, then press Enter.

[IMAGE]

- At the CAT9K-CL’s WebUI login screen, enter the username: aiera-user@ciscolivevegas.com and password: Ciscolive!135, then select Log In to access the WebUI dashboard.

[IMAGE]

- Feel free to navigate the WebUI to generate additional traffic associated with your laptop IP Address to monitor utilization.
- At the page’s top-right corner, select the Log Out button. A pop-up will appear that asks, “Are you sure you want to log out?”, select Yes. Close the browser window after successfully logging out.

[IMAGE]

## Result
In this task, you simulated network traffic to data center assets in the SEA01-103 host group by accessing devices via SSH and HTTPS. By generating flows using multiple protocols, you confirmed that the SNA environment is capturing and organizing NetFlow telemetry as expected. This prepares you for subsequent analysis of device utilization and flow records.

---