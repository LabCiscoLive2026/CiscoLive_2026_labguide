from typing import Optional

from splunk_connect import (
    get_exceeding_capacity,
    get_offline_pdus,
    get_temperature_for_row,
    get_total_available_active_power,
    refresh_excel_cache,
)
from fastapi import APIRouter, Query
from pydantic import BaseModel
import reservations as res_store


router = APIRouter(prefix="/api", tags=["functions"])


@router.get('/health')
def get_functions():
    return {"status": "ok"}

@router.get('/offline-pdus')
def get_offline_pdus_route():
    return get_offline_pdus()

@router.get('/temperature')
def get_temperature_for_row_route(
    row: Optional[str] = Query(default=None),
    rack: Optional[str] = Query(default=None),
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


# ---------- Credential Reservation Routes ----------

class ReserveRequest(BaseModel):
    token: str = ""          # client-generated token stored in localStorage


@router.get('/reservations')
def get_reservations():
    return {"users": res_store.get_all_statuses()}


@router.get('/reservations/check-token')
def check_token(token: str = Query(default="")):
    return {"active": res_store.check_token(token)}


@router.post('/reservations/{user_num}/reserve')
def reserve_credential(user_num: int, body: ReserveRequest):
    return res_store.reserve(user_num, body.token)


@router.post('/reservations/{user_num}/release')
def release_credential(user_num: int):
    return res_store.release(user_num)