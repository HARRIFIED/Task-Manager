from flask import jsonify
from Models.tasks import User
from flask_bcrypt import Bcrypt


def test_login(client, test_app):
    # Create a test user for the login test

    response = client.post("/api/register", json={
        "username": "test2",
        "email": "test@yopmail.com",
        "password": "12345678"
    })
    

    # Define test login data
    login_data = {
        'username': 'test2',
        'password': '12345678'
    }

    # Perform the login request
    response = client.post('/api/login', json=login_data)

    # Assert the response status code
    assert response.status_code == 200

    data = response.get_json()
    assert 'access_token' in data
    assert 'data' in data

    access_token = response.json.get("access_token")

    # Will use it in other test... Expecting warning but will improvise with future version of pytest
    return access_token 
