from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import UserProfile
from utils.meal_generator import generate_meal_plan

router = APIRouter(prefix="/api/meals", tags=["meals"])

@router.get("/{user_id}")
def get_meal_plan(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    plan = generate_meal_plan(user.target_calories, user.diet_type)
    return {"user_id": user_id, "meal_plan": plan}
