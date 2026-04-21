# Task 2: Tracking Assets – Host Group Management

Now that you have confirmed that the SNA appliances are connected and functional, they can be used to monitor asset utilization in your data center. The assets you want to track should be configured in the Host Group Management, by providing that subnet’s information to the SNA dashboard, your appliances will begin capturing and storing that network’s traffic data. For this task, we will demonstrate how to add a Host Group in the SNA and assign the asset’s subnet to it.

## Step 1: Navigating to Host Group Management

- From SNA Manager, navigate to Configure > Host Group Management

<div class="dashboard-imgs" markdown>
<figure markdown>
  ![Secure Network Analytics UI](./assets/task1/1.png)
</figure>
</div>

## Step 2: Adding a Host Group - No admin access, just a demonstration [Note]

Within a single domain, Host Groups are added to one of two categories in the SNA: Inside Hosts for trusted internal assets, or Outside Hosts for untrusted external hosts. This segmentation allows for the application of detailed security policies and deeper insight into traffic patterns. The assets from the SEA01-103 data center are internal and trusted, so you will add them to Inside Hosts.

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
