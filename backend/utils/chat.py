import os
import google.generativeai as genai

api_key = "AIzaSyBJhDlGt7s5WKU0qRtQU_hByKqLHmI9zWY"
if api_key:
    genai.configure(api_key=api_key)

def get_chat_response(message: str, history: list) -> str:
    """Uses Gemini API to get a diet-related response."""
    if not api_key:
        return "Chatbot is running in demo mode. Please configure GEMINI_API_KEY in the backend to receive real AI responses. You asked: " + message
    
    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        prompt = "You are DietBuddy, an AI nutritionist for Tamil Nadu / Indian diets.\n"
        for h in history:
            prompt += f"User: {h['user']}\nDietBuddy: {h['bot']}\n"
        prompt += f"User: {message}\nDietBuddy: "
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error talking to Gemini: {e}")
        return "Sorry, I am having trouble connecting to my AI brain right now."
