import threading
from datetime import datetime, timedelta

MAX_SLOTS = 2
RESERVATION_MINUTES = 90

CREDENTIALS = [
    {"num": 1,  "vpn": "user01@ciscolivevegas.com", "ssh": "user01", "password": "eaHZP_a8zphk*ty"},
    {"num": 2,  "vpn": "user02@ciscolivevegas.com", "ssh": "user02", "password": "peWZa.8b!NUE2Xk"},
    {"num": 3,  "vpn": "user03@ciscolivevegas.com", "ssh": "user03", "password": "P23DrP@8TU3i@8E"},
    {"num": 4,  "vpn": "user04@ciscolivevegas.com", "ssh": "user04", "password": "kTeTY!2WVZkmdKg"},
    {"num": 5,  "vpn": "user05@ciscolivevegas.com", "ssh": "user05", "password": "@Cc4urKaR@7LmbR"},
    {"num": 6,  "vpn": "user06@ciscolivevegas.com", "ssh": "user06", "password": "JEVYBH4E-Z.udVP"},
    {"num": 7,  "vpn": "user07@ciscolivevegas.com", "ssh": "user07", "password": "yea*dkt9ciBBX6E"},
    {"num": 8,  "vpn": "user08@ciscolivevegas.com", "ssh": "user08", "password": "Cu9r.-6JG!fJ_kM"},
    {"num": 9,  "vpn": "user09@ciscolivevegas.com", "ssh": "user09", "password": "-Fi8nEMaPiawQNw"},
    {"num": 10, "vpn": "user10@ciscolivevegas.com", "ssh": "user10", "password": "af2yehUidvZ-*km"},
    {"num": 11, "vpn": "user11@ciscolivevegas.com", "ssh": "user11", "password": "Ds8Ee7vZzn*fPa."},
    {"num": 12, "vpn": "user12@ciscolivevegas.com", "ssh": "user12", "password": "Nx7R3hkP4b!ub"},
    {"num": 13, "vpn": "user13@ciscolivevegas.com", "ssh": "user13", "password": "md7gaRFPy.C6xY6"},
    {"num": 14, "vpn": "user14@ciscolivevegas.com", "ssh": "user14", "password": "GEfg4@WTRN4aL!j"},
    {"num": 15, "vpn": "user15@ciscolivevegas.com", "ssh": "user15", "password": "Nz-CTudHavgue9A"},
    {"num": 16, "vpn": "user16@ciscolivevegas.com", "ssh": "user16", "password": "8saE_sMo.wh4HD"},
    {"num": 17, "vpn": "user17@ciscolivevegas.com", "ssh": "user17", "password": "r*vG3tBHwDGeXc9"},
    {"num": 18, "vpn": "user18@ciscolivevegas.com", "ssh": "user18", "password": "QdqJukv4G_nNQUg"},
    {"num": 19, "vpn": "user19@ciscolivevegas.com", "ssh": "user19", "password": "nuUN32qrM-8z!Dv"},
    {"num": 20, "vpn": "user20@ciscolivevegas.com", "ssh": "user20", "password": "a9rHrBF36DaV-*N"},
]

# { user_num: [ {reserved_by, expires_at}, ... ] }  — up to MAX_SLOTS entries
_reservations: dict[int, list[dict]] = {}
_lock = threading.Lock()


def _active_slots(entries: list[dict]) -> list[dict]:
    now = datetime.utcnow()
    return [e for e in entries if now < e["expires_at"]]


def _min_seconds_remaining(active: list[dict]) -> int:
    """Time until the FIRST (fastest) slot expires — i.e. when next slot opens."""
    if not active:
        return 0
    now = datetime.utcnow()
    return max(0, int((min(e["expires_at"] for e in active) - now).total_seconds()))


def get_all_statuses() -> list[dict]:
    with _lock:
        # Purge expired slots globally
        for num in list(_reservations.keys()):
            _reservations[num] = _active_slots(_reservations[num])
            if not _reservations[num]:
                del _reservations[num]

        result = []
        for cred in CREDENTIALS:
            num = cred["num"]
            active = _reservations.get(num, [])
            slots_used = len(active)
            result.append({
                **cred,
                "slots_used": slots_used,
                "slots_total": MAX_SLOTS,
                "status": "full" if slots_used >= MAX_SLOTS else ("partial" if slots_used > 0 else "available"),
                "seconds_remaining": _min_seconds_remaining(active),
            })
    return result


def reserve(user_num: int, token: str = "") -> dict:
    with _lock:
        active = _active_slots(_reservations.get(user_num, []))
        if len(active) >= MAX_SLOTS:
            return {
                "success": False,
                "message": f"User {user_num:02d} is fully booked — both slots are taken.",
            }
        expires_at = datetime.utcnow() + timedelta(minutes=RESERVATION_MINUTES)
        active.append({"token": token.strip(), "expires_at": expires_at})
        _reservations[user_num] = active
        slots_left = MAX_SLOTS - len(active)
        return {
            "success": True,
            "message": f"User {user_num:02d} reserved for {RESERVATION_MINUTES} minutes.",
            "expires_at": expires_at.isoformat(),
            "slots_remaining": slots_left,
        }


def check_token(token: str) -> bool:
    """Return True if the token is still active in any slot."""
    with _lock:
        for entries in _reservations.values():
            for e in _active_slots(entries):
                if e.get("token") == token:
                    return True
    return False


def release(user_num: int) -> dict:
    with _lock:
        if user_num in _reservations:
            del _reservations[user_num]
            return {"success": True, "message": f"User {user_num:02d} released."}
        return {"success": False, "message": f"User {user_num:02d} was not reserved."}
