from fastapi import APIRouter
from app import crud
from app.schemas import TaskCreate, TaskUpdate
from app.models import Task

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/")
async def get_tasks(username: str):
    return await crud.get_tasks_by_user(username)

@router.post("/")
async def create_task(task: TaskCreate, username: str):
    task_obj = Task(title=task.title, description=task.description, owner=username)
    return await crud.create_task(task_obj.dict())

@router.patch("/{task_id}")
async def update_task(task_id: str, task: TaskUpdate):
    await crud.update_task_status(task_id, task.status)
    return {"msg": "Tarea actualizada"}

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    await crud.delete_task(task_id)
    return {"msg": "Tarea eliminada"}
