from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import get_db
from models import UserProfile
from utils.meal_generator import generate_meal_plan
from utils.pdf_generator import generate_diet_plan_pdf
import os

router = APIRouter(prefix="/api/export", tags=["export"])

@router.get("/pdf/{user_id}")
def export_pdf(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    plan = generate_meal_plan(user.target_calories, user.diet_type)
    
    user_dict = {
        "id": user.id,
        "full_name": user.full_name,
        "fitness_goal": user.fitness_goal,
        "diet_type": user.diet_type,
        "target_calories": user.target_calories
    }
    
    pdf_path = generate_diet_plan_pdf(user_dict, plan)
    
    if os.path.exists(pdf_path):
        return FileResponse(pdf_path, media_type='application/pdf', filename=os.path.basename(pdf_path))
    else:
        raise HTTPException(status_code=500, detail="Error generating PDF")
