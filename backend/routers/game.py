from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from logic.xp_calculator import calculate_xp

router = APIRouter()

class FocusSession(BaseModel):
    minutes: int

@router.post("/calculate-xp")
def get_xp_reward(session: FocusSession):
    minutes = session.minutes
    xp_earned = calculate_xp(minutes)
    return {"xp_earned": xp_earned}