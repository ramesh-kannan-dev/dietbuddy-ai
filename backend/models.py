from sqlalchemy import Column, Integer, String, Float
from database import Base

class UserProfile(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    gender = Column(String)
    age = Column(Integer)
    height = Column(Float)
    weight = Column(Float)
    activity_level = Column(String)
    fitness_goal = Column(String)
    diet_type = Column(String)
    
    # Calculated outputs
    bmr = Column(Float)
    tdee = Column(Float)
    target_calories = Column(Float)
    target_protein = Column(Float)
    target_fat = Column(Float)
    target_carbs = Column(Float)
