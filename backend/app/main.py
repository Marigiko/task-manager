from fastapi import FastAPI
from app.routes import tasks, users

app = FastAPI(title="Task Manager API")

app.include_router(users.router)
app.include_router(tasks.router)
