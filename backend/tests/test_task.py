import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_get_tasks_empty():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/tasks/", params={"username": "testuser"})
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
