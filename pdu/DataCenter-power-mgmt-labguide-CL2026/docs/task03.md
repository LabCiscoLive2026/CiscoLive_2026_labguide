# Task 3: Optimize PDU Capacity and Phase Balance for CHG01-101 AI Readiness

**Objective:** The **CHG01-101** facility is currently reporting **PDU threshold alerts** for **CHG01-101-D-17-PDU-1**. As we prepare for **high-density AI server** integration, maintaining optimal **power headroom** is critical. You are tasked with conducting a deep-dive investigation to mitigate **overload risks** and stabilize **power distribution**.

## Step 1: PDU Dashboard Access

To access the **Smart PDU dashboard**, please follow the instructions below:

Open **chrome** browser to access the **smart PDU dashboard** and login to the dashboard using the following credentials.

| <!-- -->     | <!-- -->                   |
| ------------ | -------------------------- |
| `URL`        | [{{ smart_pdu.url }}]({{ smart_pdu.url }}){target=_blank} |
| `Username`   | {{ smart_pdu.username }}   |
| `Password`   | {{ smart_pdu.password }}   |

## Step 2: Explore the Smart PDU GUI

For this exercise, we are selecting PDU `CHG01-101-D-17-PDU-1` from the **CHG Data Center**. The dashboard shows **critical load data** for the **three-phase** power lines, **L1**, **L2**, and **L3**, including current (**amps**), voltage, and **phase-specific load distribution**. This layout is essential for identifying **phase imbalances** and ensuring the PDU operates within defined **safety thresholds**.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Smart PDU Dashboard](./assets/task3/pdu_ui1.png)
  <figcaption>PDU CHG01-101-D-17-PDU-1 — 3-phase monitoring</figcaption>
</figure>
</div>

In this example, PDU `CHG01-101-D-17-PDU-1` the **L3** phase is currently showing a **high-load condition**. To mitigate this imbalance, we recommend rebalancing the load by migrating selected devices from **L3** to **L2**.

## Step 3: Explore the Smart PDU GUI — PDU Tab

Now, click the **PDU tab** on the **left-side navigation bar**. This opens the **overview dashboard** for PDU `CHG01-101-D-17-PDU-1`, which serves as the **main reference point** for **device-level information**. It provides quick access to key hardware details, firmware status, and operational configuration settings

<!-- <div class="dashboard-imgs" markdown>
<figure markdown>
  ![PDU Tab](./assets/task3/pdu_ui2.png)
  <figcaption>PDU CHG01-101-D-17-PDU-1 — 3-phase monitoring</figcaption>
</figure>
</div> -->

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![PDU Tab](./assets/task3/pdu_view1.png)
</figure>
</div>

!!! note "Inventory Details"
    This section displays the core asset information needed for inventory management and troubleshooting:

    - **Firmware Version:** The current software build running on the PDU.
    - **Model:** The specific hardware model of the unit
    - **Serial Number:** The unique hardware identifier for the PDU.
    - **Active Network Interfaces:** The network ports currently active on the device, such as eth0 and eth1.
    - **Rating:** The input power rating of the PDU, including voltage, phase, and frequency.

## Step 4: Explore the Smart PDU GUI — Inlet

Click the **Inlet** tab from the **left-hand navigation menu** to view detailed information regarding the **PDU inlets**.

<!-- <div class="dashboard-imgs" markdown>
<figure markdown>
  ![Inlet Tab](./assets/task3/pdu_view2.png)
</figure>
</div> -->

This view provides a granular, **real-time** analysis of the PDU's electrical performance at the **inlet level**. It is designed for monitoring **load distribution** and identifying potential power issues across the **three phases**.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Inlet Tab](./assets/task3/pdu_inlet1.png)
</figure>
</div>

!!! note "Important"
    - **Phase Summary (Top Bar):**
        - Displays real-time current readings for phases L1, L2, and L3.
        - **Status Indicators:** Provides immediate visual alerts regarding power thresholds. In this instance, L1 is flagged as "above upper warning" (orange), L2 is "normal" (green), and L3 is "above upper critical" (red), highlighting the need for load balancing.

    <!-- - **Detailed Metrics Table:**
        - Lists specific electrical parameters, including RMS Current, RMS Voltage, Active/Apparent/Reactive Power, Apparent Energy, and Power Factor.
        - This allows engineers to perform a deep-dive analysis into the PDU's power quality and efficiency. -->

    - **Historical PDU Power Consumption Trend:**
        - Provides a visual representation of power consumption, measured in watts, over time. It helps identify historical load patterns and assess the impact of load-balancing adjustments

## Step 5: Explore the Smart PDU GUI — Outlets

Click the **Outlets** tab from the **left-hand navigation menu** to view detailed information regarding the **PDU outlets**.

<!-- <div class="dashboard-imgs" markdown>
<figure markdown>
  ![Outlets Tab](./assets/task3/pdu_inlet2.png)
</figure>
</div> -->

This information helps identify which outlets are actively drawing power and which are energized but currently unused. It also helps correlate outlet usage with the PDU’s **phase distribution**, making it easier to detect uneven loading, validate connected equipment power consumption, and plan **load rebalancing** across phases when needed.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Outlets Tab](./assets/task3/pdu_outlet.png)
</figure>
</div>

**Column/Label Definitions:**

| Column          | Description |
| --------------- | ----------- |
| Status          | shows whether the outlet is currently on.|
| RMS Current (A) | shows the current drawn by the connected device in amps.|
| Active Power (W)| shows the real-time power consumption in watts. |
| Power Factor    | indicates how efficiently the connected load is using power. |
| Line            | identifies which phase pair or phase-to-neutral connection the outlet is using.|

!!! tip "Summary"

    By leveraging these three primary views, you can take a systematic approach to optimizing PDU capacity and balancing the electrical phases for CHG01-101-D-17-PDU-1:

    1. **Identify the Issue (Inlet View):** Use the Inlet dashboard to monitor real-time phase conditions. This view serves as the primary indicator for spotting phases, such as L3, that are approaching or exceeding safe operating thresholds.

    2. **Verify Asset Integrity (Overview View):** Use the Overview dashboard to confirm the PDU’s hardware status, firmware version, and operational settings. This helps ensure the unit is healthy and properly configured before making any load-balancing adjustments.

    3. **Execute the Solution (Outlets View):** Use the Outlets dashboard for detailed outlet-level analysis. By reviewing the power draw in amps and watts for individual outlets, you can identify specific high-load devices contributing to the phase imbalance and determine which devices can be safely migrated to less-utilized phases.

## Result

By combining **real-time phase monitoring** with **outlet-level power analysis**, you can optimize load distribution within a Data Center to reduce the chance of a **PDU trip**, and help prevent **service interruptions**. Ongoing monitoring ensures the PDU remains within **safe operating thresholds** while supporting reliable infrastructure performance.

---
