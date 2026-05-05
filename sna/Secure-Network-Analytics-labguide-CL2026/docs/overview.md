# Overview

Welcome to the Gain Real-Time Visibility into **Asset Utilization with Cisco SNA and Splunk** walk-in lab!

In any data center, knowing which devices are actively being used — and which ones are not — is the foundation for **smart infrastructure decisions**. **Idle devices** waste power, cooling, and rack space. **Heavily utilized devices** may need capacity relief. And without **visibility** into **access patterns**, it is difficult to plan for next-generation workloads like **AI deployments**.


<div class="dashboard-imgs-overview" markdown style="max-width: min(45rem, 80vw); padding: 10px; margin-inline: auto;">
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

## Getting Started

### Access Requirements

#### Connectivity and Hardware

- Network Access: Ensure you have a stable internet connection for the duration of the session
- Recommended Hardware: A laptop or tablet is recommended for full compatibility and optimal interaction with the dashboard interfaces
- VPN Client: Cisco Secure Client
- Terminal Emulator: PuTTY
- Browser: Google Chrome

### SNA Virtual Appliances — Provided in This Lab

- SNA Manager (v7.6.0)
- SNA Flow Collector (v7.6.0)
- SNA Data Node (v7.6.0)

---
