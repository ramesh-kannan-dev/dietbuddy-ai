from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import UserProfile
from utils.nutrition import calculate_bmr, calculate_tdee, calculate_macros
from pydantic import BaseModel

router = APIRouter(prefix="/api/profile", tags=["profile"])

class ProfileCreate(BaseModel):
    full_name: str
    gender: str
    age: int
    height: float
    weight: float
    activity_level: str
    fitness_goal: str
    diet_type: str

@router.post("/")
def create_profile(profile: ProfileCreate, db: Session = Depends(get_db)):
    bmr = calculate_bmr(profile.gender, profile.weight, profile.height, profile.age)
    tdee = calculate_tdee(bmr, profile.activity_level)
    macros = calculate_macros(tdee, profile.fitness_goal)
    
    db_user = UserProfile(
        **profile.dict(),
        bmr=bmr,
        tdee=tdee,
        target_calories=macros["calories"],
        target_protein=macros["protein"],
        target_fat=macros["fat"],
        target_carbs=macros["carbs"]
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    return db.query(UserProfile).filter(UserProfile.id == user_id).first()
