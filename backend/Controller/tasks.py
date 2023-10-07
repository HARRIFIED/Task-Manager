from flask import jsonify, request
from Models.tasks import Task, task_schema, tasks_schema
from Models import db


def create_task():
    try:
        title = request.json.get('title')
        description = request.json.get('description')
        due_date = request.json.get('due_date')
        status = request.json.get('status')
        priority = request.json.get('priority')
        tags = request.json.get('tags')

        if not title:
            return jsonify({"message": "Title is required"}), 400

        new_task = Task(title=title, description=description, due_date=due_date, status=status, priority=priority, tags=tags)
        db.session.add(new_task)
        db.session.commit()

        return jsonify({"message": "Task created successfully", "data": task_schema.dump(new_task)}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while creating the task", "error": str(e)}), 500




def get_tasks():
    all_tasks = Task.query.all()
    serialized_tasks = tasks_schema.dump(all_tasks)
    
    return jsonify({"message": "Tasks retrieved successfully", "data": serialized_tasks}), 200


def get_task(id):
    task = Task.query.get(id)
    
    if task is None:
        return jsonify({"message": f"Task with ID {id} not found"}), 404

    return jsonify({"message": "Task found", "data": task_schema.dump(task)}), 200


def update_task(id):
    try:
        task = Task.query.get(id)
        
        if task is None:
            return jsonify({"message": f"Task with ID {id} not found"}), 404

        title = request.json.get('title')
        description = request.json.get('description')
        due_date = request.json.get('due_date')
        status = request.json.get('status')
        priority = request.json.get('priority')
        tags = request.json.get('tags')

        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if due_date is not None:
            task.due_date = due_date
        if status is not None:
            task.status = status
        if priority is not None:
            task.priority = priority
        if tags is not None:
            task.tags = tags

        db.session.commit()
        return jsonify({
            "message": f"Task with ID {id} updated successfully", 
            "data": task_schema.dump(task)
            }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while updating the task", "error": str(e)}), 500


def delete_task(id):
    task = Task.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        response_data = {
            "message": f"Task with title '{task.title}' successfully deleted",
            "data": None  
        }
        return jsonify(response_data), 200
    else:
        response_data = {
            "message": f"Task with ID {id} not found",
            "data": None
        }
        return jsonify(response_data), 404