from flask import jsonify, request
from Models.tasks import Task, task_schema, tasks_schema
from Models import db

def create_task():
    title = request.json['title']
    description = request.json['description']
    due_date = request.json['due_date']

    new_task = Task(title, description, due_date)
    db.session.add(new_task)
    db.session.commit()

    return task_schema.jsonify(new_task)


def get_tasks():
    all_tasks = Task.query.all()
    result = tasks_schema.dump(all_tasks)
    return jsonify(result)

def get_task(id):
    task = Task.query.get(id)
    return task_schema.jsonify(task)