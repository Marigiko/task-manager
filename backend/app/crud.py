from app.database import db
from typing import List

async def create_task(data: dict) -> dict:
    await db.tasks.insert_one(data)
    return data

async def get_tasks_by_user(username: str) -> List[dict]:
    return await db.tasks.find({"owner": username}).to_list(100)

async def update_task_status(task_id: str, status: str):
    await db.tasks.update_one({"id": task_id}, {"$set": {"status": status}})

async def delete_task(task_id: str):
    await db.tasks.delete_one({"id": task_id})
