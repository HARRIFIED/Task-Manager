
from flask import jsonify
from flask_jwt_extended import create_access_token
from Models.tasks import User


def test_register(client, test_app):
    
    
    response = client.post("/api/register", json={
        "username": "test2",
        "email": "test@yopmail.com",
        "password": "12345678"
    })

    assert response.status_code == 201

    data = response.get_json()
    assert data['message'] == "User registered successfully"

    # Since database is created everytime we run the test so we expect to only have one user
    # So we cab expect to have the data supplied like email
    with test_app.app_context():
        assert User.query.count() == 1  
        assert User.query.first().email == "test@yopmail.com"
        assert User.query.first().username == "test2"
        
