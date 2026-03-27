from splunk_connect import (
    get_exceeding_capacity,
    get_offline_pdus,
    get_temperature_for_row,
    get_total_available_active_power,
    refresh_excel_cache,
)
from fastapi import APIRouter, Query


router = APIRouter(prefix="/api", tags=["functions"])


@router.get('/health')
def get_functions():
    return {"status": "ok"}

@router.get('/offline-pdus')
def get_offline_pdus_route():
    return get_offline_pdus()

@router.get('/temperature')
def get_temperature_for_row_route(
    row: str | None = Query(default=None),
    rack: str | None = Query(default=None),
):
    return get_temperature_for_row(row_label=row, rack=rack)

@router.get('/available-active-power')
def get_available_active_power():
    return get_total_available_active_power()

@router.get('/exceeding-capacity/{threshold}')
def get_pdus_for_threshold(threshold: int):
    return get_exceeding_capacity(threshold)


@router.post('/refresh-cache')
def refresh_cache():
    return refresh_excel_cache()