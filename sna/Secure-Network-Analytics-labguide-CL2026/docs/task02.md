# Task 2: Tracking Assets – Host Group Management

Now that you have confirmed that the SNA appliances are connected and functional, they can be used to monitor asset utilization in your data center. The assets you want to track should be configured in the Host Group Management, by providing that subnet’s information to the SNA dashboard, your appliances will begin capturing and storing that network’s traffic data. For this task, we will demonstrate how to add a Host Group in the SNA and assign the asset’s subnet to it.

## Step 1: Navigating to Host Group Management

- From SNA Manager, navigate to Configure > Host Group Management

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 2: Adding a Host Group

!!! note "Demonstration scope"
    This segment is a **guided demonstration** of host-group creation (no elevated admin lab seat is assumed). **REVISIT:** Update if the event grants write-capable roles or a different SMC tenant.

Within a single domain, host groups are placed under **Inside Hosts** (trusted internal assets) or **Outside Hosts** (untrusted external hosts). That split supports policy and reporting boundaries. Assets for **SEA01-103** are internal, so you add them under **Inside Hosts**.

- Next to Inside Hosts, select the (...) icon.
- In the popup menu that appears, select Add Host Group.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

- Under Host Group Name, enter SEA01-103
- Under IP Addresses and Ranges, enter 10.0.13.0/24
- Select the Save button to add the Host Group

!!! tip "Before you expect flows"
    New or edited host groups need time to propagate through collectors and indexing. **REVISIT:** Add a realistic delay or “ask your proctor” line if your lab measures minutes vs. hours.

## Step 3: Verifying the New Host Group is Added

After adding your Host Group, it is important to check that it was created successfully.

- Select the dropdown arrow (>) next to Inside Hosts to expand the list.
- Select SEA01-103 to display the Host Group information.

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
  <figcaption>Edit Picture, remove box over Host Group ID</figcaption>
</figure>
</div>

## Result
In this task, you learned how to track asset utilization by creating a Host Group in Cisco Secure Network Analytics (SNA). You navigated to Host Group Management, added the internal subnet (10.0.13.0/24) as SEA01-103 under Inside Hosts, and verified the group was created successfully. These steps enable SNA to begin monitoring and storing network traffic for the specified assets.

---
