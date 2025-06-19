from fastapi import APIRouter, Request, HTTPException
from app import crud
from app.schemas import TaskCreate, TaskUpdate
from app.models import Task as TaskModel, Status

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/")
async def get_tasks(username: str, request: Request):
    db = request.app.database
    return await crud.get_tasks_by_user(db, username)

@router.post("/")
async def create_task(task: TaskCreate, request: Request):
    db = request.app.database

    # Creamos la tarea como objeto Pydantic
    new_task = TaskModel(
        title=task.title,
        description=task.description,
        owner=task.owner,
        status=Status.todo
    )

    return await crud.create_task(db, new_task.dict())


@router.patch("/{task_id}")
async def update_status(task_id: str, update: TaskUpdate, request: Request):
    print(f"Actualizando tarea {task_id} a estado")
    db = request.app.database
    await crud.update_task_status(db, task_id, update.status)
    return {"msg": "Tarea actualizada"}

@router.delete("/{task_id}")
async def delete(task_id: str, request: Request):
    db = request.app.database
    await crud.delete_task(db, task_id)
    return {"msg": "Tarea eliminada"}
