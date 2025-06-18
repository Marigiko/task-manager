import pytest
from httpx import AsyncClient
from httpx import ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_signup_and_login():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        user = {"username": "testuser", "password": "testpass"}

        res_signup = await ac.post("/users/signup", json=user)
        assert res_signup.status_code in [200, 400]

        res_login = await ac.post("/users/login", json=user)
        assert res_login.status_code == 200
        assert "access_token" in res_login.json()
