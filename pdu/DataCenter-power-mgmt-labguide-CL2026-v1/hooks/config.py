import datetime
import logging
import os

import yaml
from mkdocs.config.defaults import MkDocsConfig

LOG = logging.getLogger(__name__)

LAB_CONFIG_PATH = os.path.join("data", "lab_config.yaml")


def _load_lab_config() -> dict:
    """Load the centralised lab configuration file."""
    if not os.path.exists(LAB_CONFIG_PATH):
        LOG.warning("Lab config not found at %s — using defaults", LAB_CONFIG_PATH)
        return {}
    with open(LAB_CONFIG_PATH, "r", encoding="utf-8") as fh:
        data = yaml.safe_load(fh)
    return data if isinstance(data, dict) else {}


def on_config(config: MkDocsConfig) -> MkDocsConfig | None:
    lab = _load_lab_config()

    # --- Site identity ------------------------------------------------------
    lab_id = lab.get("lab_id", "")
    lab_title = lab.get("lab_title", "")

    if lab_id and lab_title:
        config.site_name = f"{lab_id}: {lab_title}"
    elif lab_title:
        config.site_name = lab_title

    config.site_author = lab.get("authors", config.site_author or "")

    # Expose to Jinja templates (used in home.html)
    config.lab_id = lab_id  # type: ignore[attr-defined]
    config.lab_title = lab_title  # type: ignore[attr-defined]

    # --- Copyright with auto-updating year ----------------------------------
    year = str(datetime.datetime.now().year)
    config.copyright = f"Copyright &copy; {year} Cisco"

    # --- Site description for HTML meta tags --------------------------------
    if not config.site_description:
        config.site_description = config.site_name

    # --- Navigation (built from lab_config.yaml) ----------------------------
    nav = lab.get("nav")
    if nav:
        config["nav"] = nav

    LOG.info("Lab config applied — %s: %s", lab_id, lab_title)
