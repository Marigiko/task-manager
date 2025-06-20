import logging
from fastapi import APIRouter, HTTPException, Request
from app.schemas import User
from app.auth import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/signup")
async def signup(user: User, request: Request):
    db = request.app.database
    logging.info(f"🧾 POST /users/signup - usuario: {user.username}")
    try:
        user_exist = await db.users.find_one({"username": user.username})
        if user_exist:
            logging.warning(f"⚠️ Usuario '{user.username}' ya existe")
            raise HTTPException(status_code=400, detail="Usuario ya existe")

        hashed_pw = get_password_hash(user.password)
        await db.users.insert_one({"username": user.username, "password": hashed_pw})
        logging.info(f"✅ Usuario creado: {user.username}")
        return {"msg": "Usuario creado"}
    except Exception as e:
        logging.error(f"❌ Error en signup: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
async def login(user: User, request: Request):
    db = request.app.database
    logging.info(f"🔐 POST /users/login - usuario: {user.username}")
    try:
        db_user = await db.users.find_one({"username": user.username})
        if not db_user or not verify_password(user.password, db_user["password"]):
            logging.warning(f"⚠️ Login inválido para usuario: {user.username}")
            raise HTTPException(status_code=401, detail="Credenciales inválidas")

        token = create_access_token({"sub": user.username})
        logging.info(f"✅ Login exitoso: {user.username}")
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        logging.error(f"❌ Error en login: {e}")
        raise HTTPException(status_code=500, detail=str(e))
