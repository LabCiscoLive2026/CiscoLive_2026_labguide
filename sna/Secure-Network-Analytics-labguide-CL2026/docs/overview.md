# Overview

This lab provides step-by-step instructions on how to configure **Cisco Secure Network Analytics (SNA)** to monitor **device-level flow counts** and export **network telemetry data to Splunk** for **centralized analysis and reporting**.

## Scenario: Asset utilization Levaraging Splunk and Cisco Secure Network Analytics(SNA)

In this lab, you will leverage **Cisco Secure Network Analytics (SNA)** and **Splunk Cloud** to gain comprehensive visibility into asset utilization across your network. **SNA** continuously collects NetFlow telemetry from monitored devices, capturing detailed information about every network conversation — including who is communicating, what protocols are being used, and how much data is being transferred. This telemetry is exported to **Splunk Cloud** via the **Cisco Secure Network Analytics App for Splunk**, enabling you to run powerful queries and build dashboards for centralized analysis.

You will also integrate **SNA** telemetry with **Splunk Cloud** to visualize device utilization through Splunk's dashboarding and analytics capabilities. When users log into devices, NetFlow data is automatically exported to capture their access activity, which you will analyze in this lab.

**This lab consists of Five tasks:**

- Task 1: Simulating Asset Utilization Using NetFlow
- Task 2: Analyzing SEA01-103 Network Traffic – Flow Search
- Task 3: Identify the top utilized hosts in your network based on unique flow count and total bytes transferred
- Task 4: Analyze top network flows to determine who accessed what, how they accessed it (protocol/port), and how long the access spanned
- Task 5: Splunk Integration with Cisco SNA

Together, these tasks provide a complete picture of asset utilization — from creating the network traffic to identify the busiest devices and to understand the specific communication patterns driving that utilization.


<div class="dashboard-imgs" markdown>
<figure markdown>
  ![topology](./assets/overview/overview_1.png)
</figure>
</div>

## Lab topology (reference)

The lab environment consists of the following components:

- **Cisco Secure Network Analytics VMs** — SNA Manager and Flow Collector ingesting NetFlow telemetry  
- **ESXi host** — Hypervisor hosting lab virtual machines  
- **Network devices** — Switches and related infrastructure exporting flow data  
- **Firewall** — Internet connectivity for the lab  
- **Splunk Cloud** — Tenant receiving SNA telemetry via the **Cisco Secure Network Analytics App for Splunk**  

High level: **SNA VMs, ESXi, and devices → switching → firewall → Internet → Splunk Cloud**.

## Prerequisites

- SNA Manager is configured and collecting NetFlow from monitored devices.  
- SNA telemetry is exported to Splunk Cloud via the **Cisco Secure Network Analytics App for Splunk**.  
- The Cisco Secure Network Analytics App for Splunk is **installed and configured** on Splunk Cloud.
- You have **access to Splunk Cloud** with permission to run searches.


## Learning Objectives

Upon completion of this lab, you will be able to:

{% for obj in learning_objectives %}
- {{ obj }}
{% endfor %}

!!! Note
    The datacenter entry gateway is pre-configured for NetFlow, streaming telemetry to the SNA Flow Collector for analysis. **SNA Manager, Data Node, and Flow Collector** are pre-provisioned for walk-in use, and the **SEA01-103** host group (**10.0.13.0/24**) is already available for monitoring—so you begin with **traffic generation (Task 1)** rather than appliance setup pages.


!!! note "Quick Notes"
    ### What is a Flow Collector?

    - A Flow Collector is a core component of the Cisco Secure Network Analytics (SNA) architecture. Its primary function is to **ingest, deduplicate, and store flow data** (such as NetFlow) exported from network devices.
    - By processing this telemetry, the Flow Collector provides the **Stealthwatch Management Console (SMC)** with the granular data necessary for network-wide visibility, behavioral analysis, and threat detection.

    ### Why is Visibility into Device Access Important?

    Maintaining visibility into how often devices are accessed within the data center is critical for several reasons:

    - **Security Posture:** Tracking access patterns allows administrators to identify anomalous behavior, such as unauthorized lateral movement or potential data exfiltration attempts.
    - **Compliance:** Many regulatory frameworks require organizations to maintain logs of who accessed which resources, for how long, and with what frequency.
    - Troubleshooting: Detailed flow logs provide a historical audit trail, making it easier to diagnose connectivity issues or performance bottlenecks between endpoints.

    ### Benefits of Monitoring for Capacity Planning

    Beyond security, monitoring device access provides actionable insights for infrastructure management:

    - **Predictive Resource Allocation:** By analyzing traffic trends, administrators can identify highly utilized servers or services. This enables proactive scaling decisions, such as adding hardware or increasing bandwidth, to prevent performance degradation before it occurs.
    - **Optimization of Assets:** Monitoring reveals underutilized devices, allowing IT teams to consolidate workloads, reduce power consumption, and optimize the overall data center footprint.
    - **Trend Analysis:** Establishing a baseline of "normal" traffic patterns helps in forecasting future growth requirements, ensuring that the data center infrastructure evolves in alignment with business demands.


!!! warning "Disclaimer"
    This lab was designed exclusively for educational and training purposes. The activities performed within this environment are conducted on controlled dashboards and do not reflect real-time changes to live production infrastructure.
