from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

async def create_task(db: AsyncIOMotorDatabase, data: dict) -> dict:
    result = await db.tasks.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

async def get_tasks_by_user(db: AsyncIOMotorDatabase, username: str) -> List[dict]:
    tasks = await db.tasks.find({"owner": username}).to_list(100)
    for task in tasks:
        task["_id"] = str(task["_id"])
    return tasks

async def update_task_status(db: AsyncIOMotorDatabase, task_id: str, status: str):
    await db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": {"status": status}})

async def delete_task(db: AsyncIOMotorDatabase, task_id: str):
    await db.tasks.delete_one({"_id": ObjectId(task_id)})
