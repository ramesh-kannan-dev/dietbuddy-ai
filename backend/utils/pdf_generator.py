import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def generate_diet_plan_pdf(user_profile: dict, meal_plan: list) -> str:
    """Generates a PDF for the user and returns the file path"""
    filename = f"diet_plan_{user_profile.get('id', 'temp')}.pdf"
    # Ensure directory exists
    output_dir = os.path.join(os.path.dirname(__file__), "..", "temp_pdfs")
    os.makedirs(output_dir, exist_ok=True)
    filepath = os.path.join(output_dir, filename)
    
    c = canvas.Canvas(filepath, pagesize=letter)
    width, height = letter
    
    # Title
    c.setFont("Helvetica-Bold", 20)
    c.drawString(50, height - 50, "DietBuddy - 7 Day Personalized Meal Plan")
    
    # User Profile
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 90, f"Name: {user_profile.get('full_name', 'Guest')}")
    c.drawString(50, height - 110, f"Goal: {user_profile.get('fitness_goal', 'Maintain')} | Diet: {user_profile.get('diet_type', 'Mixed')}")
    c.drawString(50, height - 130, f"Target Calories: {user_profile.get('target_calories')} kcal/day")
    
    # Motivatonal Quote
    c.setFont("Helvetica-Oblique", 14)
    c.setFillColor(colors.darkgreen)
    c.drawString(50, height - 160, '"Discipline is the best form of self-care."')
    c.setFillColor(colors.black)
    
    y = height - 200
    c.setFont("Helvetica-Bold", 14)
    for day_plan in meal_plan:
        if y < 150:
            c.showPage()
            y = height - 50
            c.setFont("Helvetica-Bold", 14)
            
        c.drawString(50, y, f"Day {day_plan['day']} - Total Cals: {day_plan['total_calories']}")
        y -= 25
        
        c.setFont("Helvetica", 10)
        meals = day_plan['meals']
        for meal_time, meal_data in meals.items():
            text = f"{meal_time.capitalize()}: {meal_data['name']} ({meal_data['calories']} kcal, {meal_data['protein']}g protein, {meal_data['fat']}g fat)"
            c.drawString(70, y, text)
            y -= 15
            
        y -= 15
        c.setFont("Helvetica-Bold", 14)
        
    c.save()
    return filepath
