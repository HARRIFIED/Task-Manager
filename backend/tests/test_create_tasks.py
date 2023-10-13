from flask import jsonify
from flask_jwt_extended import create_access_token
from .test_login import test_login

def test_create_tasks(client, test_app):
    
    access_token = test_login(client, test_app)

    # Make sure the access token is not empty
    assert access_token is not None

    # Simulate an authenticated request by setting the JWT token
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    task_json = {
        "title": "Create updatedAt column test",
        "description": "Create a status column on the database",
        "due_date": "2023-10-10T12:00:00Z",
        "tags": "backend"
    }

    response = client.post("/api/add_task", json=task_json, headers=headers)

    assert response.status_code == 201

    data = response.get_json()
    assert data['message'] == "Task created successfully"

    assert data["data"] is not None
    
    task_data = data['data']
    task_id = task_data["id"]
    assert task_id is not None
    # Will use it in other test with tasks... Expecting warning but will improvise with future version of pytest
    return task_id

    
