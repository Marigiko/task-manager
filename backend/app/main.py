from fastapi import FastAPI
from app.routes import tasks, users
from fastapi.middleware.cors import CORSMiddleware
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    mongo_url = os.getenv("MONGO_URL", "mongodb://mongo:27017")
    try:
        client = AsyncIOMotorClient(mongo_url)
        app.mongodb_client = client
        app.database = client["taskdb"]
        logging.info(f"✅ Connected to MongoDB at {mongo_url}")
        yield
    finally:
        client.close()
        logging.info("🛑 MongoDB connection closed")

app = FastAPI(lifespan=lifespan, title="Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(tasks.router)
