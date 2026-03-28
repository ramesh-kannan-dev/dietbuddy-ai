from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
from utils.chat import get_chat_response

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []  # [{"user": "...", "bot": "..."}]

@router.post("/")
def chat_with_bot(request: ChatRequest):
    bot_reply = get_chat_response(request.message, request.history)
    return {"reply": bot_reply}
