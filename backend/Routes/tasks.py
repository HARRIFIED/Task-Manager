from flask import Blueprint, request, jsonify
from Models.tasks import Task, task_schema
from Models import db

# Create a Blueprint for routes
task_bp = Blueprint('task_bp', __name__)

@task_bp.route('/api/add_task', methods=['POST'])
def add_task():
    title = request.json['title']
    description = request.json['description']
    due_date = request.json['due_date']

    new_task = Task(title, description, due_date)
    db.session.add(new_task)
    db.session.commit()

    return task_schema.jsonify(new_task)
