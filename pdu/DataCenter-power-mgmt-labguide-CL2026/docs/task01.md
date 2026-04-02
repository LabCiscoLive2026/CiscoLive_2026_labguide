# Task 1: Validate DC SEA01-103 Power and Cooling capacity for 300kW AI Deployment

**Objective:** Evaluate the electrical and thermal capacity of the SEA01-103 data center to support a 300kW high-density AI server deployment. Given the intensive power requirements of modern AI workloads, this assessment is critical to validating that our existing infrastructure can sustain this load without compromising our 100% uptime commitment.

## Step 1: Accessing the AI Era Power Management Dashboard
To ensure best experience and consistent performance during your lab, please follow the instructions for dashboard access:

- Open Chrome browser to access the Splunk Power Management Dashboard to ensure optimal dashboard functionality and system
stability.
- Click on the link to access Splunk AI Era Power Management Dashboard and Login to the dashboard using the following credentials:

| <!-- -->     | <!-- -->                   |
| ------------ | -------------------------- |
| `URL`        | [Splunk Dashboard: AI Era Power Management Demo]({{ splunk.url }}){target=_blank} |
| `Username`   | {{ splunk.username }}      |
| `Password`   | {{ splunk.password }}      |


## Step 2: Check the Total Power Capacity for Seattle Site — SEA01-103 Data Center

Please utilize the global filter - Select **Seattle** site and the **SEA01-131** Data Center.
Ensure the page is fully loaded before proceeding with the power and cooling assessment to guarantee the accuracy of your data.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![SEA01-103 Dashboard](./assets/task1/pdu_dashboard1.png)
  <!-- <figcaption>AI Era Power Management Dashboard(SEA01-103)</figcaption> -->
</figure>
</div>

The highlighted three panels provides a real-time visibility for Data Center SEA01-103:

- **Total Power Capacity:** 1315 kW represents 80% of the total rated load, serving as the optimal safety threshold for the facility.
- **Total Active Power Drawn:** 601 kW shows the current power consumption of the Data Center.
- **Total Available Active Power:** 713 kW indicates the remaining power available for additional equipment deployment.
- **Current Utilization**: 45.71%
<div class="dashboard-imgs" markdown>
<figure markdown>
  ![SEA01-103 Dashboard](./assets/task1/pdu_dashboard2.png)
  <!-- <figcaption>AI Era Power Management Dashboard(SEA01-103)</figcaption> -->
</figure>
</div>
### Power Utilization Analysis: SEA01-103

Based on the current dashboard metrics for the SEA01-103 data center, the power profile is as follows:

| Metric                      | Value         |
| --------------------------- | ------------- |
| Total Power Capacity        | 1,315 kW      |
| Current Power Load          | 601.1070 kW   |
| Available Power Headroom    | 713.8210 kW   |
| Current Utilization         | 45.71%        |

To visualize the power distribution topology for the Smart PDUs, click the highlighted Total Active Power Drawn

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Temperature Sensor Details](./assets/task1/pdu_dashboard3.png)
</figure>
</div>
<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Topology View](./assets/task1/pdu_topology.png)
  <!-- <figcaption>SEA01-103 Transformer Feed — Power Flow Topology</figcaption> -->
</figure>
</div>

This view provides power-feed granularity from the utility source through the transformer feed, bus bars/panels, rows, and
racks.

The topology dashboard serves as a critical real-time heatmap for our power distribution, providing clear visibility into real time power consumption.

- **Critical Alerts (Red Tiles):** Indicates that the PDU inside the Data Center have exceeding the 80% threshold indicating
immediate remediation, like device migration or the decommissioning of unused hardware, to mitigate overload/power outage
risks.
- **Warning Indicators (Orange Tiles):** Denotes racks approaching capacity limits, necessitating pre-emptive load management.
- **Optimal Capacity (Green Tiles):** Identifies racks with sufficient headroom for new equipment addition.

Look at the highlighted  **Active Power Drawn Trend** panel below. Then switch to the main dashboard tab that is already open and locate the Active Power Drawn panel. This panel shows the historical load trend over the past seven days.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![SEA01-103 Dashboard](./assets/task1/pdu_dashboard4.png)
  <!-- <figcaption>AI Era Power Management Dashboard(SEA01-103)</figcaption> -->
</figure>
</div>

With this analysis, we have confirmed that the SEA01-103 data center has sufficient electrical capacity to support the proposed 300 kW AI server deployment, with 713.82 kW of available headroom. By cross-referencing the load distribution with the topology heatmap, we can strategically place these workloads in “green” racks to achieve optimal power distribution and better load balancing.
This data-driven approach enables us to scale our AI capabilities while maintaining our commitment to 100% uptime and operational
stability.


## Step 3: Validate Cooling Compliance for AI Infrastructure in SEA01-103

The objective is to monitor environmental conditions inside the data center to ensure cooling is operating effectively. Meraki sensors have been deployed throughout the data center to provide visibility into temperature, humidity, and sensor battery status.
Review the highlighted average values for temperature, humidity, and battery levels from all sensors to evaluate the general environmental state.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![SEA01-103 Dashboard](./assets/task1/pdu_dashboard5.png)
  <!-- <figcaption>AI Era Power Management Dashboard(SEA01-103)</figcaption> -->
</figure>
</div>

Then, click the temperature value to view the list of sensors in the data center, including each sensor’s individual temperature, humidity, and battery level.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![SEA01-103 Dashboard](./assets/task1/pdu_dashboard6.png)
  <!-- <figcaption>AI Era Power Management Dashboard(SEA01-103)</figcaption> -->
</figure>
</div>
Click the page numbers or the Next button located at the bottom right of the interface to navigate through the complete list of deployed temperature sensors.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Temperature Sensor Details](./assets/task1/pdu_temperature.png)
</figure>

<!-- !!! info "Thermal Compliance" -->
Current telemetry confirms that ambient temperatures within the lab are within the optimal range for high-density AI hardware. To ensure peak performance and hardware longevity, the environment must be maintained between **64°F and 80°F (18°C–27°C)**. Proactive
management of these thermal parameters is essential to prevent hardware throttling, mitigate equipment failure risks, and ensure the
long-term reliability of our AI infrastructure.

## Result

<!-- !!! success "Capacity Summary" -->
Based on current power availability and thermal performance metrics, location **SEA01-103** is verified as capable of supporting a **300kW AI server load deployment**.

---
