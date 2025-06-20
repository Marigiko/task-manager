import logging
from fastapi import APIRouter, Request, HTTPException
from app import crud
from app.schemas import TaskCreate, TaskUpdate
from app.models import Task as TaskModel, Status

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/")
async def get_tasks(username: str, request: Request):
    db = request.app.database
    logging.info(f"🔍 GET /tasks - username={username}")
    try:
        tasks = await crud.get_tasks_by_user(db, username)
        logging.info(f"✅ {len(tasks)} tareas encontradas para '{username}'")
        return tasks
    except Exception as e:
        logging.error(f"❌ Error al obtener tareas: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_task(task: TaskCreate, request: Request):
    db = request.app.database
    new_task = TaskModel(
        title=task.title,
        description=task.description,
        owner=task.owner,
        status=Status.todo
    )
    logging.info(f"📝 POST /tasks - creando tarea: {new_task.dict()}")

    try:
        created = await crud.create_task(db, new_task.dict())
        logging.info(f"✅ Tarea creada: {created}")
        return created
    except Exception as e:
        logging.error(f"❌ Error al crear tarea: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{task_id}")
async def update_status(task_id: str, update: TaskUpdate, request: Request):
    db = request.app.database
    logging.info(f"✏️ PATCH /tasks/{task_id} - nuevo estado: {update.status}")
    try:
        await crud.update_task_status(db, task_id, update.status)
        return {"msg": "Tarea actualizada"}
    except Exception as e:
        logging.error(f"❌ Error al actualizar tarea {task_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{task_id}")
async def delete(task_id: str, request: Request):
    db = request.app.database
    logging.info(f"🗑 DELETE /tasks/{task_id}")
    try:
        await crud.delete_task(db, task_id)
        return {"msg": "Tarea eliminada"}
    except Exception as e:
        logging.error(f"❌ Error al eliminar tarea {task_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))
