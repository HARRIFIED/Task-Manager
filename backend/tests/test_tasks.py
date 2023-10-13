from flask import jsonify
from flask_jwt_extended import create_access_token
from .test_login import test_login


def test_get_tasks(client, test_app):

    access_token = test_login(client, test_app)
    # Make sure the access token is not empty
    assert access_token is not None

    # Simulate an authenticated request by setting the JWT token
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = client.get("/api/tasks", headers=headers)

    assert response.status_code == 200

    data = response.get_json()
    assert data['message'] == "Tasks retrieved successfully"
