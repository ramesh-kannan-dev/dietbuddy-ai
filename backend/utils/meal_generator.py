import random

BREAKFAST_OPTIONS = [
    {"name": "Idli + Sambar", "calories": 300, "protein": 10, "fat": 5, "carbs": 50},
    {"name": "Pongal", "calories": 350, "protein": 8, "fat": 15, "carbs": 45},
    {"name": "Wheat Dosa", "calories": 250, "protein": 8, "fat": 6, "carbs": 40},
    {"name": "Poori + Masala", "calories": 400, "protein": 9, "fat": 20, "carbs": 50},
    {"name": "Aappam + Coconut Milk", "calories": 320, "protein": 6, "fat": 12, "carbs": 45},
    {"name": "Ragi Dosa", "calories": 280, "protein": 9, "fat": 8, "carbs": 42},
    {"name": "Upma", "calories": 310, "protein": 7, "fat": 10, "carbs": 48},
]

LUNCH_OPTIONS = [
    {"name": "Sambar Rice", "calories": 400, "protein": 12, "fat": 8, "carbs": 65},
    {"name": "Chicken Biryani", "calories": 600, "protein": 25, "fat": 20, "carbs": 70, "type": "non-veg"},
    {"name": "Curd Rice", "calories": 350, "protein": 10, "fat": 10, "carbs": 50},
    {"name": "Lemon Rice", "calories": 380, "protein": 8, "fat": 12, "carbs": 55},
    {"name": "Fish Fry + Rice", "calories": 500, "protein": 28, "fat": 15, "carbs": 60, "type": "non-veg"},
    {"name": "Vegetable Pulao", "calories": 420, "protein": 10, "fat": 12, "carbs": 65},
    {"name": "Kothu Parotta", "calories": 550, "protein": 15, "fat": 22, "carbs": 70},
]

DINNER_OPTIONS = [
    {"name": "Chapati + Veg Curry", "calories": 350, "protein": 12, "fat": 10, "carbs": 50},
    {"name": "Rasam Rice", "calories": 300, "protein": 8, "fat": 5, "carbs": 55},
    {"name": "Chappati + Fish Curry", "calories": 450, "protein": 22, "fat": 12, "carbs": 55, "type": "non-veg"},
    {"name": "Parotta + Chicken Salna", "calories": 650, "protein": 20, "fat": 30, "carbs": 75, "type": "non-veg"},
    {"name": "Idiyappam + Stew", "calories": 380, "protein": 10, "fat": 12, "carbs": 55},
]

SNACK_OPTIONS = [
    {"name": "Sundal", "calories": 150, "protein": 8, "fat": 3, "carbs": 22},
    {"name": "Peanut Ladoo", "calories": 200, "protein": 6, "fat": 12, "carbs": 20},
    {"name": "Masala Vada", "calories": 250, "protein": 6, "fat": 15, "carbs": 25},
    {"name": "Mixed Fruits", "calories": 100, "protein": 2, "fat": 1, "carbs": 25},
]

DRINK_OPTIONS = [
    {"name": "Buttermilk", "calories": 50, "protein": 3, "fat": 2, "carbs": 5},
    {"name": "Tender Coconut Water", "calories": 45, "protein": 1, "fat": 0, "carbs": 10},
    {"name": "Lemon Mint Juice", "calories": 60, "protein": 0, "fat": 0, "carbs": 15},
    {"name": "Fresh Fruit Juice", "calories": 120, "protein": 1, "fat": 0, "carbs": 28},
]

def generate_meal_plan(target_calories: int, diet_type: str) -> list:
    """Generate a 7-day meal plan based on target calories and diet type (veg/non-veg/mixed)"""
    plan = []
    
    for day in range(1, 8):
        # Filter options based on diet type
        available_lunch = [m for m in LUNCH_OPTIONS if diet_type.lower() == "mixed" or ("type" not in m and diet_type.lower()[:3] == "veg") or (m.get("type") == "non-veg" and diet_type.lower()[:7] == "non-veg")]
        if not available_lunch: available_lunch = LUNCH_OPTIONS # fallback
        
        available_dinner = [m for m in DINNER_OPTIONS if diet_type.lower() == "mixed" or ("type" not in m and diet_type.lower()[:3] == "veg") or (m.get("type") == "non-veg" and diet_type.lower()[:7] == "non-veg")]
        if not available_dinner: available_dinner = DINNER_OPTIONS
        
        daily_meals = {
            "day": day,
            "meals": {
                "breakfast": random.choice(BREAKFAST_OPTIONS),
                "lunch": random.choice(available_lunch),
                "dinner": random.choice(available_dinner),
                "snack": random.choice(SNACK_OPTIONS),
                "drink": random.choice(DRINK_OPTIONS)
            }
        }
        
        total_cals = sum([daily_meals["meals"][meal]["calories"] for meal in daily_meals["meals"]])
        daily_meals["total_calories"] = total_cals
        
        plan.append(daily_meals)
        
    return plan
