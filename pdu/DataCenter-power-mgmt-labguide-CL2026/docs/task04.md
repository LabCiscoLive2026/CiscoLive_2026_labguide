# Task 4: Execute Python Script to Query Splunk Data

**Objective:** Use the Python-based CLI tool to programmatically query and analyze real-time power management and environmental data across Data Center sites.

**Context:** While the Splunk dashboards provide a rich visual interface, this script offers a lightweight, terminal-based alternative for querying the same underlying data. It is ideal for quick operational checks, scripted automation, and scenarios where dashboard access is unavailable.


## Step 1: Connect to the Lab Environment

Before launching the script, you need to connect to the lab VM where the tool is hosted.

**1a.** Establish a VPN connection to `173.37.192.194` using the following credentials:

| <!-- -->     | <!-- -->                   |
| ------------ | -------------------------- |
| `Username`   | {{ be_script_vpn.username }}   |
| `Password`   | {{ be_script_vpn.password }}   |

**1b.** RDP into the lab VM and log in as `cisco_live_user`:

| <!-- -->     | <!-- -->                   |
| ------------ | -------------------------- |
| `Username`   | {{ be_script.username }}   |
| `Password`   | {{ be_script.password }}   |


## Step 2: Launch the Script

Open a terminal on the VM. Verify the script is present by running `ls` — you should see `cisco_live_demo_data.py` in the current directory. Then launch it:

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

Enter **1** to view the data center's power capacity summary. The output displays total capacity (at 80% NEC threshold), active draw, and available headroom:

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

Enter **2** to retrieve a high-level summary of PDU fleet status. This provides a quick snapshot of how many PDUs are deployed, actively in use, available for provisioning, or currently offline:

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

Enter **3** to list all PDUs currently in an offline state. Each entry includes the data center, rack name, and host IP address to help pinpoint the affected device for troubleshooting:

```
> Select a scenario: 3

Offline PDUs for Data Center SEA01-103:
---------------------------------------

[1]
    Data_Center: SEA01-103
    Rack: SEA01-103-AM-6-PDU-2
    Host_ip: 10.0.153.77

[2]
    Data_Center: SEA01-103
    Rack: SEA01-103-AM-10-PDU-1
    Host_ip: 10.0.153.86
...
```

!!! warning
    Offline PDUs may indicate network connectivity issues or hardware failures. Cross-reference these IPs with your network monitoring tools.

Press "Enter" to return to the scenario menu.


## Step 7: Identify PDUs Exceeding 90% Capacity

Enter **4** to identify PDUs that are operating above the 90% load threshold. Each entry displays the row, rack, current amperage, and consumption percentage — helping you prioritize which units need immediate load redistribution:

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
    Value: 22.04 amps
    PDU_consumption: 91.8%
...
[10]
    Data_Center: SEA01-103
    Row: AY
    Rack: SEA01-103-AY-4-PDU-2
    Value: 26.20 amps
    PDU_consumption: 109%
```

!!! danger
    PDUs at or above 100% consumption (e.g., 105%, 109%) are exceeding their rated capacity and pose a risk of breaker trips. Immediate load redistribution is recommended.

Press "Enter" to return to the scenario menu.


## Step 8: Query Data Center Temperature

Enter **5** to retrieve the average ambient temperature across the entire data center. This value is computed from all Meraki MT10 environmental sensors deployed in the facility:

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

Enter **6** to drill down into a specific row or aisle. This returns the average temperature and humidity across all sensors in that row, giving you a more granular view of environmental conditions:

```
> Select a scenario: 6

Row Temperature for Data Center SEA01-103:
------------------------------------------

Specify the Row/Aisle to monitor (Enter:'ac'): ac

Temperature data:
-----------------

  [1]
    Data_Center: SEA01-103
    Row: AC
    Avg_Temp: 80.9°F / 27.2°C
    Avg_Humidity: 8.7%
```

Press "Enter" to return to the scenario menu.


## Step 10: Query Rack Temperature

Enter **7** to inspect a specific rack's environmental readings. When prompted, enter the rack identifier in the format `row-number` (e.g., `ac-4`). This returns the individual sensor data for that rack, including temperature, humidity, and sensor battery life:

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

Press "Enter" to return to the scenario menu.


## Step 11: Exit the Script

When finished exploring, enter **8** to exit the script:

```
> Select a scenario: 8

✨Thank you for exploring our AI Era Power Management Lab Demo!
  Have an incredible time at Cisco Live and enjoy the rest of your experience!✨
```


## Result

You have used the CLI script to programmatically query all key data center metrics — power capacity, PDU fleet status, overloaded PDUs, and environmental conditions — providing a complementary, script-based approach to the Splunk dashboard workflows covered in the earlier tasks.

---
