import unittest
from flask import Flask, jsonify
from Controller.tasks import create_task
from Models.tasks import Task, User
from config import Config
from app import app, db, initialize_database

class TestTaskController(unittest.TestCase):
    def setUp(self):
        # Create a test Flask app
        app.config['TESTING'] = True
        # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # Use a test database
        app.config.from_object(Config)

        initialize_database()

        self.client = app.test_client()

    def tearDown(self):
        with app.app_context():
            db.drop_all()

    def test_login(self):
        # Define a test task data
        user_data = {
            "username": "Harrified$$",
            "password": "10042001Harri$$"
        }

        # Send a POST request to login
        response = self.client.post('/api/login', json=user_data)
        print(response)

        # Check the response status code
        self.assertEqual(response.status_code, 200)

        # Check if the task was created in the database
        with app.app_context():
            user= User.query.first()
            self.assertIsNotNone(user)
            self.assertEqual(user.username, user_data['username'])
            self.assertEqual(user.password, user_data['password'])
    
    # def test_create_task_invalid_data(self):
    #     # Send a POST request with invalid data (mi`ssing 'title' field)
    #     invalid_task_data = {
    #         "description": "This is an invalid task",
    #         "due_date": "2023-10-15"
    #     }

    #     response = app.post('/api/add_task', json=invalid_task_data)
    #     self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
