from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="DietBuddy API")

from routers import profile, meals, chat, export
from database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app.include_router(profile.router)
app.include_router(meals.router)
app.include_router(chat.router)
app.include_router(export.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to DietBuddy API"}
