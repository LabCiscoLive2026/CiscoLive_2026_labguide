#!/usr/bin/env python3
"""SSH to lab switches and log utilization.

Default mode: each lab day, pick random run times inside a configurable window
(08:00–17:00 by default), sleep until each slot, then run a random subset of
`show` commands on each host. This avoids fixed cadences and busy-polling.

Legacy mode: fixed interval between full command runs (see --legacy-interval).
"""

from __future__ import annotations

import argparse
import logging
import os
import random
import re
import sys
import time
from logging.handlers import RotatingFileHandler
from datetime import date, datetime, time as dt_time, timedelta, timezone
from pathlib import Path

from dotenv import load_dotenv

try:
    import paramiko
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Missing dependency: paramiko. Install with `pip install paramiko`."
    ) from exc

try:
    from zoneinfo import ZoneInfo
except ImportError:  # pragma: no cover — Python < 3.9
    ZoneInfo = None  # type: ignore[misc, assignment]


load_dotenv()

_LOG: logging.Logger | None = None

DEFAULT_HOSTS = "10.0.13.70,10.0.13.71"
DEFAULT_COMMANDS = (
    "show processes cpu sorted | include CPU utilization;"
    "show processes memory sorted | include Processor;"
    "show interface summary"
)


def env_list(name: str, default: str, sep: str) -> list[str]:
    raw = (os.getenv(name) or default).strip()
    return [item.strip() for item in raw.split(sep) if item.strip()]


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")


def sanitize_host(host: str) -> str:
    return "".join(c if (c.isalnum() or c in "._-") else "_" for c in host)


def app_logger() -> logging.Logger:
    if _LOG is None:
        raise RuntimeError("Application logging not initialized (internal error).")
    return _LOG


def setup_logging(log_file: Path, max_bytes: int, backup_count: int) -> logging.Logger:
    """File + console; UTF-8; rotating file. Call once from main()."""
    global _LOG
    log_file.parent.mkdir(parents=True, exist_ok=True)
    lg = logging.getLogger("automation")
    lg.handlers.clear()
    lg.setLevel(logging.INFO)
    lg.propagate = False

    fmt = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-5s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    fh = RotatingFileHandler(
        log_file,
        maxBytes=max_bytes,
        backupCount=backup_count,
        encoding="utf-8",
    )
    fh.setFormatter(fmt)
    lg.addHandler(fh)

    sh = logging.StreamHandler(sys.stdout)
    sh.setFormatter(fmt)
    lg.addHandler(sh)

    _LOG = lg
    return lg


def lab_timezone():
    """IANA zone name, e.g. America/Chicago; falls back to system local (naive) if unset."""
    name = (os.getenv("UTIL_TIMEZONE") or os.getenv("TZ") or "").strip()
    if name and ZoneInfo is not None:
        try:
            return ZoneInfo(name)
        except Exception:
            msg = f"Invalid UTIL_TIMEZONE={name!r}; using local time."
            if _LOG is not None:
                _LOG.warning(msg)
            else:
                print(f"[{utc_now()}] Warning: {msg}", file=sys.stderr)
    return None


def parse_hhmm(s: str, default_h: int, default_m: int) -> dt_time:
    s = (s or "").strip()
    if not s:
        return dt_time(default_h, default_m)
    parts = s.replace(":", " ").split()
    if len(parts) == 1 and ":" in s:
        parts = s.split(":")
    h = int(parts[0])
    m = int(parts[1]) if len(parts) > 1 else 0
    return dt_time(h, m)


def now_in_tz(tz) -> datetime:
    if tz is not None:
        return datetime.now(tz)
    return datetime.now()


def combine_local(d: date, t: dt_time, tz) -> datetime:
    if tz is not None:
        return datetime(d.year, d.month, d.day, t.hour, t.minute, t.second, tzinfo=tz)
    return datetime(d.year, d.month, d.day, t.hour, t.minute, t.second)


def generate_random_run_times(
    window_lo: datetime,
    window_hi: datetime,
    n_slots: int,
    rng: random.Random,
) -> list[datetime]:
    """Unique random datetimes inside [window_lo, window_hi), minute resolution."""
    if window_lo >= window_hi:
        return []
    span_sec = int((window_hi - window_lo).total_seconds())
    total_minutes = max(1, span_sec // 60)
    k = min(max(1, n_slots), total_minutes)
    offsets = sorted(rng.sample(range(total_minutes), k=k))
    return [window_lo + timedelta(minutes=m) for m in offsets]


def sleep_until(target: datetime, tz) -> None:
    """Sleep until `target`. Wake in chunks for Ctrl+C."""
    max_chunk = 300.0
    while True:
        if target.tzinfo is not None:
            now = datetime.now(target.tzinfo)
        elif tz is not None:
            now = datetime.now(tz)
        else:
            now = datetime.now()
        delta = (target - now).total_seconds()
        if delta <= 0:
            return
        time.sleep(min(delta, max_chunk))


def pick_random_commands(all_cmds: list[str], rng: random.Random) -> list[str]:
    """Random non-empty subset; order is random (extra jitter vs fixed CLI order)."""
    k = rng.randint(1, len(all_cmds))
    return rng.sample(all_cmds, k=k)


_PROMPT_LINE = re.compile(r"^[\w.\/-]+[#>]\s*$")


def _last_nonempty_line(text: str) -> str:
    for line in reversed(text.splitlines()):
        s = line.rstrip("\r").strip()
        if s:
            return s
    return ""


def _looks_like_user_prompt(text: str) -> bool:
    last = _last_nonempty_line(text)
    return bool(_PROMPT_LINE.match(last))


def _read_until_prompt(channel: paramiko.Channel, deadline: float) -> str:
    buf = b""
    while time.monotonic() < deadline:
        if channel.recv_ready():
            chunk = channel.recv(65536)
            if chunk == b"":
                raise EOFError(
                    "SSH shell closed unexpectedly (empty read). "
                    "If this repeats, check VTY/ACL, AAA, or that SSH shell is allowed for this user."
                )
            buf += chunk
            if b"--More--" in buf or b"--more--" in buf.lower():
                channel.send(b" ")
                time.sleep(0.05)
                continue
        text = buf.decode("utf-8", errors="replace")
        if _looks_like_user_prompt(text):
            return text
        time.sleep(0.05)
    raise TimeoutError(
        "Timed out waiting for IOS prompt (expected a line like hostname>). "
        "Try increasing UTIL_SSH_TIMEOUT_SECONDS or verify login reaches exec mode."
    )


def _run_cisco_shell_commands(
    channel: paramiko.Channel,
    commands: list[str],
    per_phase_timeout: int,
) -> list[str]:
    parts: list[str] = []
    now = time.monotonic

    parts.append("--- initial shell / MOTD ---\n")
    parts.append(_read_until_prompt(channel, now() + per_phase_timeout))

    parts.append("\n$ terminal length 0\n")
    channel.send(b"terminal length 0\r")
    parts.append(_read_until_prompt(channel, now() + per_phase_timeout))

    for command in commands:
        parts.append(f"\n$ {command}\n")
        channel.send((command + "\r").encode("utf-8"))
        parts.append(_read_until_prompt(channel, now() + per_phase_timeout))

    return parts


def run_commands_on_host(
    host: str,
    username: str,
    password: str,
    commands: list[str],
    timeout: int,
) -> tuple[bool, str, str | None]:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    output_parts = [f"[{utc_now()}] host={host} status=START"]
    error_detail: str | None = None
    channel: paramiko.Channel | None = None
    try:
        client.connect(
            hostname=host,
            username=username,
            password=password,
            timeout=timeout,
            look_for_keys=False,
            allow_agent=False,
        )
        channel = client.invoke_shell(term="vt100", width=200, height=48)
        time.sleep(0.2)
        transcript = _run_cisco_shell_commands(channel, commands, per_phase_timeout=timeout)
        output_parts.extend(transcript)
        output_parts.append(f"[{utc_now()}] host={host} status=OK")
        success = True
    except Exception as exc:
        error_detail = f"{exc.__class__.__name__}: {exc}"
        output_parts.append(f"[{utc_now()}] host={host} status=ERROR error={error_detail}")
        success = False
    finally:
        try:
            if channel is not None:
                channel.close()
        except Exception:
            pass
        client.close()
    output_parts.append("\n" + ("-" * 80))
    return success, "\n".join(output_parts) + "\n", error_detail


def run_cycle(
    hosts: list[str],
    username: str,
    password: str,
    commands: list[str],
    timeout: int,
    output_dir: Path,
    cycle_meta: str = "",
) -> bool:
    output_dir.mkdir(parents=True, exist_ok=True)
    meta_line = ""
    if cycle_meta:
        meta_line = f"[{utc_now()}] cycle_meta {cycle_meta}\n"
    app_logger().info("Starting utilization cycle | hosts=%s | %s", len(hosts), cycle_meta or "(no meta)")
    host_results: list[tuple[str, bool, str | None]] = []
    for host in hosts:
        success, log_text, error_detail = run_commands_on_host(
            host, username, password, commands, timeout
        )
        log_path = output_dir / f"{sanitize_host(host)}_utilization.log"
        with log_path.open("a", encoding="utf-8") as f:
            if meta_line:
                f.write(meta_line)
            f.write(log_text)
        if success:
            app_logger().info("OK | host=%s | log=%s", host, log_path)
        else:
            app_logger().error("ERROR | host=%s | reason=%s | log=%s", host, error_detail, log_path)
        host_results.append((host, success, error_detail))

    ok_count = sum(1 for _, ok, _ in host_results if ok)
    err_count = len(host_results) - ok_count
    app_logger().info("Cycle summary | ok=%s | error=%s", ok_count, err_count)
    if err_count:
        for host, ok, error_detail in host_results:
            if not ok:
                app_logger().error("Failed host detail | host=%s | reason=%s", host, error_detail)
    return err_count == 0


def run_random_schedule_day(
    hosts: list[str],
    username: str,
    password: str,
    all_commands: list[str],
    timeout: int,
    output_dir: Path,
    tz,
    window_start: dt_time,
    window_end: dt_time,
    n_slots: int,
    rng: random.Random,
) -> None:
    """
    Plan random times inside today's window, sleep until each, run random command subset.

    If started after window end: return immediately (outer loop can sleep until tomorrow if UTIL_DAILY_LOOP=1).
    """
    today = now_in_tz(tz).date()
    ws = combine_local(today, window_start, tz)
    we = combine_local(today, window_end, tz)
    now = now_in_tz(tz)

    if now >= we:
        app_logger().info("Past window end | window_end=%s | exiting day schedule", we.isoformat())
        return

    window_lo = ws if now < ws else now
    # small skew so we do not schedule in the same second
    if window_lo <= now:
        window_lo = now + timedelta(seconds=5)

    if window_lo >= we:
        app_logger().info("No time left in today's window | exiting")
        return

    slots = generate_random_run_times(window_lo, we, n_slots, rng)
    app_logger().info(
        "Random schedule | runs=%s | from=%s | to=%s | tz=%s",
        len(slots),
        window_lo.isoformat(),
        we.isoformat(),
        tz or "naive-local",
    )
    if slots:
        slot_times = ", ".join(f"{i}/{len(slots)}={s.isoformat()}" for i, s in enumerate(slots, start=1))
        app_logger().info("Random schedule slot times | %s", slot_times)
    for i, slot in enumerate(slots, start=1):
        if now_in_tz(tz) >= we:
            app_logger().info("Window ended before slot %s | stopping", i)
            break
        app_logger().info("Sleeping until slot %s/%s | target=%s", i, len(slots), slot.isoformat())
        sleep_until(slot, tz)
        if now_in_tz(tz) >= we:
            app_logger().info("Past window end after wait | stopping before slot %s run", i)
            break
        chosen = pick_random_commands(all_commands, rng)
        meta = (
            f"slot={i}/{len(slots)} local_time={slot.isoformat()} "
            f"command_count={len(chosen)} commands={chosen!r}"
        )
        app_logger().info("Triggering slot %s/%s | %s", i, len(slots), meta)
        run_cycle(hosts, username, password, chosen, timeout, output_dir, cycle_meta=meta)

    app_logger().info("Finished all scheduled runs for this session")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="SSH to lab devices and log utilization (random daily schedule or legacy interval)."
    )
    parser.add_argument(
        "--once",
        action="store_true",
        help="Run one cycle immediately (random command subset) and exit.",
    )
    parser.add_argument(
        "--legacy-interval",
        action="store_true",
        help="Use fixed UTIL_INTERVAL_HOURS sleep between full command runs (old behavior).",
    )
    args = parser.parse_args()

    username = (os.getenv("LAB_SSH_USER") or "").strip()
    password = (os.getenv("LAB_SSH_PASSWORD") or "").strip()
    if not username or not password:
        raise SystemExit(
            "Set LAB_SSH_USER and LAB_SSH_PASSWORD in environment or .env."
        )

    hosts = env_list("UTIL_HOSTS", DEFAULT_HOSTS, ",")
    commands = env_list("UTIL_COMMANDS", DEFAULT_COMMANDS, ";")
    timeout = int((os.getenv("UTIL_SSH_TIMEOUT_SECONDS") or "60").strip() or "60")
    output_dir = Path(
        (os.getenv("UTIL_LOG_DIR") or "utilization_logs").strip() or "utilization_logs"
    )

    app_log_path = Path(
        (os.getenv("UTIL_APP_LOG") or str(output_dir / "automation.log")).strip()
        or str(output_dir / "automation.log")
    )
    max_bytes = int((os.getenv("UTIL_APP_LOG_MAX_BYTES") or str(5 * 1024 * 1024)).strip() or str(5 * 1024 * 1024))
    backup_count = int((os.getenv("UTIL_APP_LOG_BACKUPS") or "3").strip() or "3")
    setup_logging(app_log_path, max_bytes=max_bytes, backup_count=backup_count)

    if not hosts:
        raise SystemExit("No hosts configured. Set UTIL_HOSTS (comma-separated).")
    if not commands:
        raise SystemExit("No commands configured. Set UTIL_COMMANDS (semicolon-separated).")

    seed = (os.getenv("UTIL_RANDOM_SEED") or "").strip()
    rng = random.Random(int(seed)) if seed.isdigit() else random.Random()

    tz = lab_timezone()
    window_start = parse_hhmm(os.getenv("UTIL_WINDOW_START") or "8:00", 8, 0)
    window_end = parse_hhmm(os.getenv("UTIL_WINDOW_END") or "17:00", 17, 0)
    n_slots = int((os.getenv("UTIL_SCHEDULE_SLOTS") or "10").strip() or "10")
    daily_loop = (os.getenv("UTIL_DAILY_LOOP") or "0").strip().lower() in ("1", "true", "yes")

    mode = "random_schedule"
    if args.once:
        mode = "--once"
    elif args.legacy_interval:
        mode = "legacy_interval"

    app_logger().info(
        "Automation start | mode=%s | user=%s | hosts=%s | command_pool=%s | ssh_timeout_s=%s | "
        "utilization_log_dir=%s | app_log=%s",
        mode,
        username,
        ",".join(hosts),
        len(commands),
        timeout,
        output_dir.resolve(),
        app_log_path.resolve(),
    )
    tz_label = getattr(tz, "key", None) or (str(tz) if tz is not None else "naive-local")
    app_logger().info(
        "Schedule config | window=%s-%s | slots_per_day=%s | daily_loop=%s | tz=%s",
        window_start.strftime("%H:%M"),
        window_end.strftime("%H:%M"),
        n_slots,
        daily_loop,
        tz_label,
    )

    if args.once:
        chosen = pick_random_commands(commands, rng)
        meta = f"mode=--once command_count={len(chosen)} commands={chosen!r}"
        all_ok = run_cycle(hosts, username, password, chosen, timeout, output_dir, cycle_meta=meta)
        if not all_ok:
            raise SystemExit("One or more hosts failed. See error lines above.")
        return

    if args.legacy_interval:
        interval_hours = float((os.getenv("UTIL_INTERVAL_HOURS") or "4").strip() or "4")
        if interval_hours <= 0:
            raise SystemExit("UTIL_INTERVAL_HOURS must be > 0.")
        sleep_seconds = int(interval_hours * 3600)
        while True:
            meta = f"mode=legacy_interval command_count={len(commands)}"
            all_ok = run_cycle(
                hosts, username, password, commands, timeout, output_dir, cycle_meta=meta
            )
            if not all_ok:
                app_logger().warning(
                    "Cycle completed with errors | will retry after interval | hours=%s",
                    interval_hours,
                )
            app_logger().info("Sleeping | hours=%s", interval_hours)
            time.sleep(sleep_seconds)

    # Default: random schedule per calendar day window
    while True:
        run_random_schedule_day(
            hosts,
            username,
            password,
            commands,
            timeout,
            output_dir,
            tz,
            window_start,
            window_end,
            n_slots,
            rng,
        )
        if not daily_loop:
            break
        # Sleep until next day window start
        tomorrow = now_in_tz(tz).date() + timedelta(days=1)
        next_ws = combine_local(tomorrow, window_start, tz)
        app_logger().info("Daily loop | sleeping until next window | target=%s", next_ws.isoformat())
        sleep_until(next_ws, tz)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        if _LOG is not None:
            app_logger().info("Stopped by user (KeyboardInterrupt)")
        else:
            print(f"\n[{utc_now()}] Stopped by user.", file=sys.stderr)
        sys.exit(0)
