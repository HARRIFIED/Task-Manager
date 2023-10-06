from flask import jsonify, request
from Models.tasks import Task, task_schema
from Models import db

def create_task():
    title = request.json['title']
    description = request.json['description']
    due_date = request.json['due_date']

    new_task = Task(title, description, due_date)
    db.session.add(new_task)
    db.session.commit()

    return task_schema.jsonify(new_task)
