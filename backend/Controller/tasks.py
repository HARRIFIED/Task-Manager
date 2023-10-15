from flask import jsonify, request
from Models.tasks import Task, task_schema, tasks_schema
from Models import db
from middleware.auth import authentication_required 
from flask_jwt_extended import jwt_required, get_jwt_identity

@jwt_required()
@authentication_required
def create_task():
    client_id = get_jwt_identity()
    try:
        title = request.json.get('title')
        description = request.json.get('description')
        due_date = request.json.get('due_date')
        status = request.json.get('status')
        priority = request.json.get('priority')
        tags = request.json.get('tags')
        user_id = client_id

        if not title:
            return jsonify({"message": "Title is required"}), 400

        if not due_date:
            return jsonify({"message": "Due date is required"}), 400
        
        if not description:
            return jsonify({"message": "Description is required"}), 400

        if not tags:
            return jsonify({"message": "Task must have a tag or category"}), 400
        

        new_task = Task(title=title, description=description, due_date=due_date, status=status, priority=priority, tags=tags, user_id=user_id)
        db.session.add(new_task)
        db.session.commit()

        return jsonify({"message": "Task created successfully", "data": task_schema.dump(new_task)}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while creating the task", "error": str(e)}), 500


@jwt_required()
@authentication_required
def get_tasks():
    # Get the user ID of the authenticated client
    client_id = get_jwt_identity()

    matching_tasks = Task.query.filter(Task.user_id == client_id).order_by(Task.created_at.desc()).all()

    serialized_tasks = tasks_schema.dump(matching_tasks)    
    return jsonify({"message": "Tasks retrieved successfully", "data": serialized_tasks}), 200


@jwt_required()
@authentication_required
def get_task(id):
    client_id = get_jwt_identity()
    task = Task.query.get(id)
    if task is None:
        return jsonify({"message": f"Task with ID {id} not found"}), 404
    
    if task.user_id == client_id:
        return jsonify({"message": "Task found", "data": task_schema.dump(task)}), 200
    else:
        return jsonify({"message": "Forbidden resource"}), 403




@jwt_required()
@authentication_required
def update_task(id):
    client_id = get_jwt_identity()
    try:
        task = Task.query.get(id)
        
        if task is None:
            return jsonify({"message": f"Task with ID {id} not found"}), 404
        if client_id != task.user_id:
            return jsonify({"message": "Forbidden Action"}), 403


        due_date = request.json.get('due_date')
        status = request.json.get('status')

        if due_date is not None:
            task.due_date = due_date
        if status is not None:
            task.status = status

        db.session.commit()
        return jsonify({
            "message": f"Task with updated successfully", 
            "data": task_schema.dump(task)
            }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while updating the task", "error": str(e)}), 500

@jwt_required()
@authentication_required
def delete_task(id):
    client_id = get_jwt_identity()
    task = Task.query.get(id)
    if client_id != task.user_id:
            return jsonify({"message": "Forbidden Action"}), 403
    if task:
        db.session.delete(task)
        db.session.commit()
        response_data = {
            "message": f"Task successfully deleted",
            "data": None  
        }
        return jsonify(response_data), 200
    else:
        response_data = {
            "message": f"Task with ID {id} not found",
            "data": None
        }
        return jsonify(response_data), 404