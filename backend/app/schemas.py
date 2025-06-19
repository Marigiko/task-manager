from typing import Optional
from pydantic import BaseModel
from app.models import Status

class TaskCreate(BaseModel):
    title: str
    description: str = ""
    owner: str
    status: Optional[Status] = None
    
class TaskUpdate(BaseModel):
    status: str

class User(BaseModel):
    username: str
    password: str
