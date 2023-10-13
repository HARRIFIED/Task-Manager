from flask import jsonify
from flask_jwt_extended import create_access_token
from .test_login import test_login
from .test_create_tasks import test_create_tasks


def test_delete_tasks(client, test_app):

    access_token = test_login(client, test_app)
    task_id = test_create_tasks(client, test_app)

    # Make sure the access token and id is not empty
    assert access_token is not None
    assert task_id is not None

    # Simulate an authenticated request by setting the JWT token
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = client.delete(
        f"/api/delete_task/{task_id}", headers=headers)

    assert response.status_code == 200

    data = response.get_json()
    assert data['message'] == f"Task successfully deleted"
