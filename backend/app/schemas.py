from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str = ""
    
class TaskUpdate(BaseModel):
    status: str

class User(BaseModel):
    username: str
    password: str
