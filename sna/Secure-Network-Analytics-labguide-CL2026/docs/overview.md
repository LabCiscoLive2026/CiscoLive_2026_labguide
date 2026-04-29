# Overview

This lab provides step-by-step instructions on how to configure Cisco Secure Network Analytics (SNA) to monitor device-level flow counts and export network telemetry data to Splunk for centralized analysis and reporting.

!!! danger "Attention"
    **Aligned with *SNALabv2.docx*:** This guide’s **Tasks 1–5** match the Word lab sequence (NetFlow -> Flow Search -> Splunk searches -> Splunk dashboard).

## Scenario: Asset utilization with Cisco SNA and Splunk Cloud

In this lab, you will leverage **Cisco Secure Network Analytics (SNA)** and **Splunk Cloud** to gain visibility into **asset utilization** across your network. SNA continuously collects NetFlow telemetry from monitored devices; you will use that data in the **SMC** (for example **Flow Search**) and in **Splunk** searches and dashboards.

You will also integrate SNA telemetry with Splunk Cloud to visualize utilization—when users and systems interact with devices, flow data reflects that activity so you can see **which assets are busiest**, **how** they are accessed, and which appear **idle** in a given window.

Together, the tasks build a path from **traffic context** through **on-box flow investigation** to **Splunk** analytics for operational insight.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![topology](./assets/overview/overview_1.png)
</figure>
</div>

## Lab topology (reference)

The lab environment includes:

- **Cisco Secure Network Analytics VMs** — SNA Manager and Flow Collector ingesting NetFlow telemetry  
- **ESXi host** — Hypervisor hosting lab virtual machines  
- **Network devices** — Switches and related infrastructure exporting flow data  
- **Firewall** — Internet connectivity for the lab  
- **Splunk Cloud** — Tenant receiving SNA telemetry via the **Cisco Secure Network Analytics App for Splunk**  

High level: **SNA VMs, ESXi, and devices → switching → firewall → Internet → Splunk Cloud**.

## Prerequisites

- SNA Manager is configured and collecting NetFlow from monitored devices.  
- SNA telemetry is exported to Splunk Cloud via the **Cisco Secure Network Analytics App for Splunk**.  
- The Splunk app is installed and configured on your tenant.  
- You can sign in to Splunk Cloud with permission to run searches (see **Credentials**).

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
