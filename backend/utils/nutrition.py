def calculate_bmr(gender: str, weight: float, height: float, age: int) -> float:
    """Mifflin-St Jeor Equation"""
    if gender.lower() == "male":
        return (10 * weight) + (6.25 * height) - (5 * age) + 5
    else:
        return (10 * weight) + (6.25 * height) - (5 * age) - 161

def calculate_tdee(bmr: float, activity_level: str) -> float:
    multipliers = {
        "low": 1.2,
        "moderate": 1.55,
        "high": 1.725
    }
    return bmr * multipliers.get(activity_level.lower(), 1.2)

def calculate_macros(tdee: float, fitness_goal: str) -> dict:
    if fitness_goal.lower() == "lose weight":
        target = tdee - 500
    elif fitness_goal.lower() == "gain weight":
        target = tdee + 500
    else:
        target = tdee
        
    # Standard split: 30% protein, 30% fat, 40% carbs
    protein_cals = target * 0.3
    fat_cals = target * 0.3
    carbs_cals = target * 0.4
    
    return {
        "calories": round(target),
        "protein": round(protein_cals / 4),
        "fat": round(fat_cals / 9),
        "carbs": round(carbs_cals / 4)
    }
