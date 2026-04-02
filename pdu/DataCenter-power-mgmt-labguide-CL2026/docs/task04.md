# Task 4: Interact with Data Using the CLI Script

As part of this walk-in lab, a Python-based script is used to query Splunk directly for real-time
power management and environmental telemetry. This demonstrates that the data displayed in
Splunk dashboards is also available through script-based access for automation, quick checks,
and CLI-driven workflows. 


## Step 1: Connect to the Lab Environment

Before launching the script, you need to connect to the lab VM where the tool is hosted.

**1a.** Establish a VPN connection to `173.37.192.194` using the following credentials:

| <!-- -->     | <!-- -->                   |
| ------------ | -------------------------- |
| `Username`   | {{ be_script_vpn.username }}   |
| `Password`   | {{ be_script_vpn.password }}   |

Additional login details can be found here: [Click Here](creds.md)


## Step 2: Launch the Script

Open Putty and run the script:

```bash
python3 cisco_live_demo_data.py
```
You will see the application banner and a site selection menu:

```
------------------------------------
| AI ERA POWER MANAGEMENT LAB DEMO |
------------------------------------

SELECT A SITE:
--------------
  1. SEATTLE (Preferred)
  2. CHICAGO
  3. DELHI
  4. FRANCE
  5. SINGAPORE
```


## Step 3: Select a Site

Enter **1** to select **SEATTLE** (the preferred site for this lab). The script will automatically map the site to its Data Center identifier:

```
> Select an option: 1

Data Center auto selected: SEA01-103
```

After selection, the scenario menu is displayed:

```
SCENARIOS:
----------
  1. Power capacity
  2. PDU details overview
  3. Offline PDUs
  4. PDUs exceeding 90% capacity
  5. Data Center Temperature
  6. Row Temperature
  7. Rack Temperature
  8. Exit
```


## Step 4: Query Power Capacity

Choose **1** to display a summary of the data center's power capacity. This will show the total capacity (at the 80% safety threshold), the current active power consumption, and the remaining power available for deploying more devices:

```
> Select a scenario: 1

Power capacity for Data Center SEA01-103:
-----------------------------------------
Power Capacity     : 1,315 kW
Active Power Drawn : 601.4330 kW
Available Power    : 716.9320 kW
```

!!! tip
    Compare these values with the Splunk dashboard (Scenario 3) to verify consistency between the script and the visual interface.

Press "Enter" to return to the scenario menu.


## Step 5: Query PDU Details Overview

Enter **2** to retrieve a summary of PDU fleet status, including total count and breakdown by operational state:

```
> Select a scenario: 2

PDU details overview for Data Center SEA01-103:
-----------------------------------------------
Total PDU count   : 272
In-use PDUs       : 217
Available PDUs    : 43
Offline PDUs      : 12
```

!!! tip
    These values correspond directly to the PDU status panels in the Splunk dashboard (Scenario 5).


## Step 6: Identify Offline PDUs

Enter **3** to list all PDUs currently in an offline state. Each entry includes the rack name and host IP address for troubleshooting:

```
> Select a scenario: 3

Offline PDUs for Data Center SEA01-103:
---------------------------------------

[1]
    Data_Center: SEA01-103
    Rack: SEA01-103-AM-6-PDU-2
    Host_ip: 10.0.2.77

[2]
    Data_Center: SEA01-103
    Rack: SEA01-103-AM-10-PDU-1
    Host_ip: 10.0.2.86

[3]
    Data_Center: SEA01-103
    Rack: SEA01-103-AP-2-PDU-1
    Host_ip: 10.0.2.101

[4]
    Data_Center: SEA01-103
    Rack: SEA01-103-AR-15-PDU-2
    Host_ip: 10.0.2.241

[5]
    Data_Center: SEA01-103
    Rack: SEA01-103-AR-16-PDU-2
    Host_ip: 10.0.2.242

[6]
    Data_Center: SEA01-103
    Rack: SEA01-103-AY-8-PDU-2
    Host_ip: 10.0.2.209

[7]
    Data_Center: SEA01-103
    Rack: SEA01-103-AD-4-PDU-1
    Host_ip: 10.2.243.1

[8]
    Data_Center: SEA01-103
    Rack: SEA01-103-AD-5-PDU-1
    Host_ip: 10.2.243.1

[9]
    Data_Center: SEA01-103
    Rack: SEA01-103-AD-6-PDU-1
    Host_ip: 10.2.243.1

[10]
    Data_Center: SEA01-103
    Rack: SEA01-103-AD-7-PDU-1
    Host_ip: 10.2.243.1

[11]
    Data_Center: SEA01-103
    Rack: SEA01-103-AD-8-PDU-1
    Host_ip: 10.2.243.1

[12]
    Data_Center: SEA01-103
    Rack: SEA01-103-AD-9-PDU-1
    Host_ip: 10.2.243.1
```

!!! warning
    Offline PDUs may indicate network connectivity issues or hardware failures. Cross-reference these IPs with your network monitoring tools.

Press "Enter" to return to the scenario menu.


## Step 7: Identify PDUs Exceeding 90% Capacity

Enter **4** to view PDUs that are operating above the 90% load threshold. Each entry displays the current amperage and consumption
percentage:

```
> Select a scenario: 4

PDUs exceeding 90% capacity for Data Center SEA01-103:
------------------------------------------------------

Count : 10

Details:
--------

[1]
    Data_Center: SEA01-103
    Row: AU
    Rack: SEA01-103-AU-7-PDU-2
    Value: 22.0 amps
    PDU_consumption: 91.8%

[2]
    Data_Center: SEA01-103
    Row: AU
    Rack: SEA01-103-AU-12-PDU-2
    Value: 22.3 amps
    PDU_consumption: 92.8%

[3]
    Data_Center: SEA01-103
    Row: AE
    Rack: SEA01-103-AE-8-PDU-1
    Value: 22.5 amps
    PDU_consumption: 93.8%

[4]
    Data_Center: SEA01-103
    Row: AS
    Rack: SEA01-103-AS-9-PDU-1
    Value: 22.6 amps
    PDU_consumption: 94.1%

[5]
    Data_Center: SEA01-103
    Row: AS
    Rack: SEA01-103-AS-4-PDU-1
    Value: 22.7 amps
    PDU_consumption: 94.7%

[6]
    Data_Center: SEA01-103
    Row: AL
    Rack: SEA01-103-AL-6-PDU-2
    Value: 22.9 amps
    PDU_consumption: 95.4%

[7]
    Data_Center: SEA01-103
    Row: AC
    Rack: SEA01-103-AC-3-PDU-2
    Value: 22.9 amps
    PDU_consumption: 95.5%

[8]
    Data_Center: SEA01-103
    Row: AY
    Rack: SEA01-103-AY-1-PDU-2
    Value: 23.6 amps
    PDU_consumption: 98.2%

[9]
    Data_Center: SEA01-103
    Row: AC
    Rack: SEA01-103-AC-5-PDU-1
    Value: 25.2 amps
    PDU_consumption: 105%

[10]
    Data_Center: SEA01-103
    Row: AY
    Rack: SEA01-103-AY-4-PDU-2
    Value: 26.2 amps
    PDU_consumption: 109%
```

!!! danger
    PDUs at or above 100% consumption (e.g., 105%, 109%) are exceeding their rated capacity and pose a risk of breaker trips. Immediate load redistribution is recommended.

Press "Enter" to return to the scenario menu.


## Step 8: Query Data Center Temperature

Enter 5 to retrieve the average temperature across the entire data center:

```
> Select a scenario: 5

Temperature for Data Center SEA01-103:
--------------------------------------
81.5°F / 27.5°C
```

!!! tip
    This aggregate gives a quick health check — ASHRAE recommends maintaining data center inlet temperatures between 64.4°F and 80.6°F (18–27°C).

Press "Enter" to return to the scenario menu.


## Step 9: Query Row Temperature

Enter 6 to drill down into a specific row or aisle to analyze the temperature. When prompted, enter a row identifier (e.g., ac):

```
> Select a scenario: 6

Row Temperature for Data Center SEA01-103:
------------------------------------------

Specify the Row/Aisle to monitor (Enter:'ac'): ac

Temperature data:
-----------------
    Data_Center: SEA01-103
    Row: AC
    Avg_Temp: 80.9°F / 27.2°C
    Avg_Humidity: 8.7%
    MT10_sensor_battery_life: 100.0%
```
The output includes temperature, humidity, and Meraki MT10 sensor battery status for the selected row.

Press "Enter" to return to the scenario menu.


## Step 10: Query Rack Temperature

Enter 7 to inspect a specific rack. When prompted, enter the rack identifier in the format (e.g., ac-4):

```
> Select a scenario: 7

Rack Temperature for Data Center SEA01-103:
-------------------------------------------

Specify the Rack to monitor (Enter:'ac-4'): ac-4

Rack Temperature:
-----------------
    Data_Center: SEA01-103
    Row: AC
    Rack: SEA01-103-AC-4-PDU-1
    Temp: 83.7°F / 28.7°C
    Humidity: 8%
    MT10_sensor_battery_life: 100%
```
The output shows the temperature, humidity and sensor battery life for rack AC-4.

Press "Enter" to return to the scenario menu.


## Step 11: Exit the Script

When finished exploring, enter **8** to exit the script:

```
> Select a scenario: 8

✨Thank you for exploring our AI Era Power Management Lab Demo!
  Have an incredible time at Cisco Live and enjoy the rest of your experience!✨
```


## Result

You have used the Python script to programmatically query all our key data center metrics -- power capacity, PDU fleet status, overloaded PDUs, and environmental conditions -- providing a complementary, script-based approach to the Splunk dashboard workflows covered in the earlier scenarios.

---
