from fastapi import APIRouter, HTTPException
from app.schemas import User
from app.auth import get_password_hash, verify_password, create_access_token
from app.database import db

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/signup")
async def signup(user: User):
    user_exist = await db.users.find_one({"username": user.username})
    if user_exist:
        raise HTTPException(status_code=400, detail="Usuario ya existe")
    hashed_pw = get_password_hash(user.password)
    await db.users.insert_one({"username": user.username, "password": hashed_pw})
    return {"msg": "Usuario creado"}

@router.post("/login")
async def login(user: User):
    db_user = await db.users.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
