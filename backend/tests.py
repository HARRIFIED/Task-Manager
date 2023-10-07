import unittest
from flask import Flask, jsonify
from Controller.tasks import create_task
from Models.tasks import Task, db
from config import Config

class TestTaskController(unittest.TestCase):
    def setUp(self):
        # Create a test Flask app
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        # self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # Use a test database
        self.app.config.from_object(Config)
        db.init_app(self.app)

        with self.app.app_context():
            db.create_all()

        self.client = self.app.test_client()

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()

    def test_create_task(self):
        # Define a test task data
        task_data = {
            'title': 'Test Task',
            'description': 'This is a test task',
            'due_date': '2023-12-31'
        }

        # Send a POST request to create the task
        response = self.client.post('/api/add_task', json=task_data)
        print(response)

        # Check the response status code
        self.assertEqual(response.status_code, 200)

        # Check if the task was created in the database
        with self.app.app_context():
            task = Task.query.first()
            self.assertIsNotNone(task)
            self.assertEqual(task.title, task_data['title'])
            self.assertEqual(task.description, task_data['description'])
            self.assertEqual(str(task.due_date), task_data['due_date'])
    
    # def test_create_task_invalid_data(self):
    #     # Send a POST request with invalid data (mi`ssing 'title' field)
    #     invalid_task_data = {
    #         "description": "This is an invalid task",
    #         "due_date": "2023-10-15"
    #     }

    #     response = self.app.post('/api/add_task', json=invalid_task_data)
    #     self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
