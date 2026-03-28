# Task 4: Interact with Data Using the CLI Script

**Objective:** Use the Python-based CLI tool to programmatically query and analyze real-time power management and environmental data across Data Center sites.

**Context:** While the Splunk dashboards provide a rich visual interface, this script offers a lightweight, terminal-based alternative for querying the same underlying data. It is ideal for quick operational checks, scripted automation, and scenarios where dashboard access is unavailable.


## Step 1: Launch the Script

Open a terminal and run the script:

```bash
python3 cisco_live_demo_data.py
```

!!! tip "Efficiency Tip"
      Streamline your reporting by piping the script output directly to a file for offline analysis:
      ```bash
      python3 cisco_live_demo_data.py > dc_report.txt
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


## Step 2: Select a Site

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


## Step 3: Query Power Capacity

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


## Step 4: Query PDU Details Overview

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


## Step 5: Identify Offline PDUs

Enter **3** to list all PDUs currently in an offline state. Each entry includes the rack name and host IP address for troubleshooting:

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


## Step 6: Identify PDUs Exceeding 90% Capacity

Enter **4** to view PDUs that are operating above the 90% load threshold. Each entry displays the current amperage and consumption percentage:

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
    PDU_consumption: 91.838%
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


## Step 7: Query Data Center Temperature

Enter **5** to retrieve the average temperature across the entire data center:

```
> Select a scenario: 5

Temperature for Data Center SEA01-103:
--------------------------------------
81.54°F / 27.52°C
```


## Step 8: Query Row Temperature

Enter **6** to drill down into a specific row or aisle. When prompted, enter a row identifier (e.g., `ac`):

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
    Temp: 83.7°F / 28.72°C
    Humidity: 8%
    MT10_sensor_battery_life: 100%

  [2]
    Data_Center: SEA01-103
    Row: AC
    Temp: 79.5°F / 26.39°C
    Humidity: 9%
    MT10_sensor_battery_life: 100%
...
```

The output includes temperature, humidity, and Meraki MT10 sensor battery status for each rack in the selected row.

Press "Enter" to return to the scenario menu.


## Step 9: Query Rack Temperature

Enter **7** to inspect a specific rack. When prompted, enter the rack identifier in the format `row-number` (e.g., `ac-4`):

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
    Temp: 83.7°F / 28.72°C
    Humidity: 8%
    MT10_sensor_battery_life: 100%
```


## Step 10: Exit the Script

When finished, enter **8** to exit:

```
> Select a scenario: 8

✨Thank you for exploring our AI Era Power Management Lab Demo!
  Have an incredible time at Cisco Live and enjoy the rest of your experience!✨
```


## Result

You have used the CLI script to programmatically query all key data center metrics -- power capacity, PDU fleet status, overloaded PDUs, and environmental conditions -- providing a complementary, script-based approach to the Splunk dashboard workflows covered in the earlier scenarios.

---