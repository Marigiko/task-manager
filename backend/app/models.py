from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
from uuid import uuid4

class Status(str, Enum):
    todo = "por hacer"
    in_progress = "en progreso"
    done = "completada"

class Task(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    title: str
    description: Optional[str] = None
    status: Status = Status.todo
    owner: str
