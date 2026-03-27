podman build -t pdu-dashboard .
podman rm -f pdu-dashboard && podman run -d -p 8081:8080 --name pdu-dashboard pdu-dashboard

nohup .venv/bin/uvicorn app:app --host 0.0.0.0 --port 8001 > uvicorn.log 2>&1 & echo $! > uvicorn.pid
ps -fp "$(cat uvicorn.pid)"
kill "$(cat uvicorn.pid)"


"""
TODOs:
- rename Labs to DataCenter or Data Center
- remove underscores
- Inside PDUs exceeding 90% capacity
    - PDU_consumption: 95.429166666666670% -> 95.4%
- add 82.43°F to " 5. Data Center Temperature"
- improve error handling with proper messages


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

> Select an option: 1

Data Center available for the site: SEA01-103

SELECT A SCENARIO:
------------------
  1. Power capacity for the data center
  2. PDU details overview
  3. Offline PDUs
  4. PDUs exceeding 90% capacity
  5. Temperature for data center
  6. Temperature for a row
  7. Temperature for a rack
  8. Exit

> Select an option: 1

Here are the results
--------------------

Power Capacity:
  Power Capacity     : 1,315 kW
  Active Power Drawn : 601.4330 kW
  Available Power    : 716.9320 kW W

> Select another scenario: 2

PDU details for Data Center SEA01-103:
--------------------------------------

PDU details for Data Center SEA01-103:
--------------------------------------
Total PDU count   : 272
In-use PDUs       : 217
Available PDUs    : 43
Offline PDUs      : 12

Offline PDU Details:
--------------------

  [1]
    Labs: SEA01-103,
    Rack: SEA01-103-AM-6-PDU-2,
    Host_ip: 10.0.153.77

"""


"""
[
  {
    "op": "replace_value",
    "params": {
      "column": "SITE",
      "old": "BGL",
      "new": "SEA"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "SITE",
      "old": "BRU",
      "new": "FCO"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "SITE",
      "old": "KRK",
      "new": "CDG"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "SITE",
      "old": "MXC",
      "new": "YVR"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "SITE",
      "old": "RCDN",
      "new": "AMST"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "SITE",
      "old": "RTP",
      "new": "SIN"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "SITE",
      "old": "SYD",
      "new": "TWN"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "SITE",
      "old": "TKY",
      "new": "KYO"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "TKY-702A",
      "new": "KYO-702A"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "MX066",
      "new": "YV066"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "RCDN5-13E",
      "new": "AMST5-13E"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "RCDN62-5D",
      "new": "AMST62-5D"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "RCDN9-DH1",
      "new": "AMST9-DH1"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "DGM03-041",
      "new": "FCO03-041"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "DGM03-G41",
      "new": "FCO03-G41"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "KRK04",
      "new": "CDG04"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "RTP12-F241",
      "new": "SIN12-F241"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "RTP12-F340",
      "new": "SIN12-F340"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "BGL18-04-402",
      "new": "SEA18-04-402"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "BGL14-01-CXLAB",
      "new": "SEA14-01-CXLAB"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "BGL16-04-4020",
      "new": "SEA16-04-4020"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "BGL16-04-4030",
      "new": "SEA16-04-4030"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "BGL16-04-4060",
      "new": "SEA16-04-4060"
    }
  },
  {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "BGL11-G39",
      "new": "SEA11-G39"
    }
  },
    {
    "op": "replace_value",
    "params": {
      "column": "LAB_NAME",
      "old": "STLD1",
      "new": "NEWY1"
    }
  }
]


autopod_accessed_1_day
autopod_accessed_1_month
autopod_accessed_1_week
autopod_accessed_3_months
autopod_accessed_6_months
autopod_accessed_devices
autopod_available_1_day
autopod_available_1_month
autopod_available_1_week
autopod_available_3_months
autopod_available_6_months
autopod_available_devices
autopod_pod_data
autopod_pool_data
cxlt_raw_autopod_device_data
cxlt_raw_autopod_device_data_all
cxlt_raw_autopod_syslog_merged_table


# SITE  => Lab (New Codes)
# BGL   => SEATTLE (SEA)
# BRU   => ROME (FCO)
# KRK   => FRANCE (CDG)
# MXC   => VANCOUVER (YVR)
# RCDN  => AMSTERDAM (AMST)
# RTP   => SINGAPORE (SIN)
# SYD   => TAIWAN (TWN)
# TKY   => KYOTO (KYO)

# Lab name mappings (old => new):
# TKY-702A       => KYO-702A
# MX066          => YV066
# STLD1          => NEWY1
# RCDN5-13E      => AMST5-13E
# RCDN62-5D      => AMST62-5D
# RCDN9-DH1      => AMST9-DH1
# DGM03-041      => FCO03-041
# DGM03-G41      => FCO03-G41
# KRK04          => CDG04
# RTP12-F241     => SIN12-F241
# RTP12-F340     => SIN12-F340
# BGL18-04-402   => SEA18-04-402
# BGL14-01-CXLAB => SEA14-01-CXLAB
# BGL16-04-4020  => SEA16-04-4020
# BGL16-04-4030  => SEA16-04-4030
# BGL16-04-4060  => SEA16-04-4060
# BGL11-G39      => SEA11-G39

"""