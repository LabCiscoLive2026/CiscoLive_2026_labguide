# SPLUNK_INDEX=zabbix_pdu
# SPLUNK_SOURCE=pdu_hosts_demo_dump
# SPLUNK_BASE_URL=https://splunk-analytics-cxlabs.cisco.com:8089
# SPLUNK_VERIFY_SSL=false
# SPLUNK_TIMEOUT_SECONDS=30
# SPLUNK_USERNAME=rbhaviri
# SPLUNK_PASSWORD=

import requests
import json

BASE_URL = "http://localhost:8001/api"

SITES = [
    "SEATTLE (Preferred)",
    "CHICAGO",
    "DELHI",
    "FRANCE",
    "SINGAPORE",
]

DATA_CENTERS = {
    "SEATTLE (Preferred)": ["SEA01-103 (Preferred)"],
}

SCENARIOS = [
    "Power capacity",
    "PDU details overview",
    "Offline PDUs",
    "PDUs exceeding 90% capacity",
    "Data Center Temperature",
    "Row Temperature",
    "Rack Temperature",
    "Exit",
]


def json_formatter(json_data):
    data = json.dumps(json_data, indent=4, ensure_ascii=False)
    for ch in ('"', '{', '}', '[', ']', ','):
        data = data.replace(ch, "")
    # remove lines that are now blank after stripping
    lines = [ln.rstrip() for ln in data.splitlines() if ln.strip()]
    return "\n".join(lines)


def prompt_selection(title: str, options: list[str]) -> int:
    print(f"\n{title}")
    print('-'*len(title))
    for i, option in enumerate(options, 1):
        print(f"  {i}. {option}")
    while True:
        if "SCENARIOS" in title:
            choice = input("\n> Select a scenario: ").strip()
        else:
            choice = input("\n> Select an option: ").strip()
        if choice.isdigit() and 1 <= int(choice) <= len(options):
            return int(choice) - 1
        print(f"  Invalid choice. Please enter a number between 1 and {len(options)}.")



def process_power_capacity():
    resp = requests.get(BASE_URL + "/available-active-power")
    data = resp.json()

    total_capacity = data.get("total_power_capacity_watts", "0.0")
    total_active = data.get("total_active_power_drawn_watts", "0.0")
    total_available = data.get("total_available_active_power_watts", "0.0")

    # print("\nPower Capacity:")
    print(f"Power Capacity     : {total_capacity}")
    print(f"Active Power Drawn : {total_active}")
    print(f"Available Power    : {total_available}")

def process_pdu_details_overview():
    resp = requests.get(BASE_URL + "/offline-pdus")
    data = resp.json()

    offline_count = data.get("count", 0)
    offline_pdus = data.get("offline_pdus", [])

    # print("\nPDU Details:")
    print(f"Total PDU count   : 272")
    print(f"In-use PDUs       : 217")
    print(f"Available PDUs    : 43")
    print(f"Offline PDUs      : {offline_count}")

def process_pdu_details():
    resp = requests.get(BASE_URL + "/offline-pdus")
    data = resp.json()
    offline_pdus = data.get("offline_pdus", [])
    # data = resp.json()

    # offline_count = data.get("count", 0)

    # # print("\nPDU Details:")
    # print(f"Total PDU count   : 272")
    # print(f"In-use PDUs       : 217")
    # print(f"Available PDUs    : 43")
    # print(f"Offline PDUs      : {offline_count}")
    # print("\nOffline PDU Details:")
    # print(f"{'-' * len('Offline PDU Details:')}")
    for i, pdu in enumerate(offline_pdus, 1):
        print(f"\n[{i}]")
        print(json_formatter(pdu))


def process_exceeding_capacity():
    resp = requests.get(BASE_URL + "/exceeding-capacity/90")
    data = resp.json()

    count = data.get("count", 0)
    exceeded = data.get("exceeded", [])

    # print("\nPDUs Exceeding 90% Capacity:")
    print(f"\nCount : {count}")

    if exceeded:
        print("\nDetails:")
        print(f"{'-' * len("Details:")}")
        for i, record in enumerate(exceeded, 1):
            print(f"\n[{i}]")
            print(json_formatter(record))
    else:
        print("  No PDUs exceeding capacity threshold.")


def process_temperature_datacenter():
    import re
    resp = requests.get(BASE_URL + "/temperature")
    data = resp.json()

    records = data.get("Temperature_monitoring", [])
    if not records:
        print("  No temperature data available.")
        return

    temps_f, temps_c = [], []
    for record in records:
        raw = str(record.get("Temp", record.get("temp", ""))).strip()
        m_f = re.search(r"([\d.]+)\s*°?F", raw, re.IGNORECASE)
        m_c = re.search(r"([\d.]+)\s*°?C", raw, re.IGNORECASE)
        if m_f:
            temps_f.append(float(m_f.group(1)))
        if m_c:
            temps_c.append(float(m_c.group(1)))

    avg_f = round(sum(temps_f) / len(temps_f), 2) if temps_f else None
    avg_c = round(sum(temps_c) / len(temps_c), 2) if temps_c else None

    avg_f = 74.43
    avg_c = 23.02
    if avg_f is not None and avg_c is not None:
        print(f"{avg_f}°F / {avg_c}°C")
    else:
        print("  Could not compute average temperature.")


def process_temperature_row():
    row = input("\nSpecify the Row/Aisle to monitor (Enter:'ac'): ").strip()
    if row not in ['ac']:
        print("\nEnter a correct Row/Aisle value!")
        return
    resp = requests.get(BASE_URL + f"/temperature?row={row}")
    data = resp.json()

    records = data.get("Temperature_monitoring", [])

    print(f"\nTemperature data:")
    print(f"{'-' * len('Temperature data:')}")
    # Data_Center: SEA01-103
    # Row: AC
    # Avg_Temp: 74.15°F / 22.86°C
    # Avg_Humidity: 8.7%
    # MT10_sensor_battery_life: 100.0%
    if records:
        for i, record in enumerate(records, 1):
            # print(f"\n  [{i}]")
            print(json_formatter(record))
    else:
        print("  No temperature data available.")


def process_temperature_rack():
    rack = input("\nSpecify the Rack to monitor (Enter:'ac-10'): ").strip()
    if rack != "ac-10":
        print("\nEnter a correct Rack value!")
        return
    resp = requests.get(BASE_URL + f"/temperature?rack={rack}")
    data = resp.json()

    records = data.get("Temperature_monitoring", [])

    print(f"\nRack Temperature:")
    print(f"{'-'*len('Rack Temperature:')}")
    # Temp: 76.09°F / 24.39°C
    # Data_Center: SEA01-103
    # Row: AC
    # Rack: SEA01-103-AC-10-PDU-1
    # Temp: 76.09°F / 24.39°C
    # Humidity: 8%
    # MT10_sensor_battery_life: 100%
    if records:
        print(json_formatter(records[0]))
    else:
        print("  No data found for the specified rack.")


def main():
    print("\n------------------------------------")
    print("| AI ERA POWER MANAGEMENT LAB DEMO |")
    print("------------------------------------")

    site_idx = prompt_selection("SELECT A SITE:", SITES)
    selected_site = SITES[site_idx]
    # print(f"=> Selected Site: {selected_site}")

    available_dcs = DATA_CENTERS.get(selected_site)
    if not available_dcs:
        print(f"\nNo data centers configured for {selected_site}.")
        return

    # dc_idx = prompt_selection("SELECT A DATA CENTER:", available_dcs)
    print(f"\nData Center auto selected: SEA01-103")
    # selected_dc = available_dcs[dc_idx]
    # print(f"=> Selected Data Center: {selected_dc}")

    scenario_handlers = [
        process_power_capacity,
        process_pdu_details_overview,
        process_pdu_details,
        process_exceeding_capacity,
        process_temperature_datacenter,
        process_temperature_row,
        process_temperature_rack,
    ]
    idx = prompt_selection("SCENARIOS:", SCENARIOS)
    while True:
        if idx == len(SCENARIOS) - 1:
            print("\n✨Thank you for exploring our AI Era Power Management Lab Demo! I hope you enjoyed it!\n  Have an incredible time at Cisco Live and enjoy the rest of your experience!✨\n")
            break
        try:
            if SCENARIOS[idx] == "Data Center Temperature":
                heading = "Temperature for"
            # elif SCENARIOS[idx] == "Temperature for a row":
            #     heading = f"Temperature for a row in"
            else:
                heading = f"{SCENARIOS[idx]} for"
            text = f'{heading} Data Center SEA01-103:'
            print(f"\n{text}")
            print('-' * len(text))
            scenario_handlers[idx]()
            # print("\n(Press 'Enter' to see scenarios again)")

        except Exception as e:
            print(f"  Error: {e}")
        
        while input("\n> Press 'Enter' to see scenarios again: ").strip():
            continue
        idx = prompt_selection("SCENARIOS:", SCENARIOS)


if __name__ == "__main__":
    main()

