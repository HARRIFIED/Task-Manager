from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import request, jsonify

from Models.tasks import Task, task_schema, tasks_schema, User, user_schema, users_schema

from Models import db, flask_bcrypt


def get_users():
    all_users = User.query.all()
    serialized_users = users_schema.dump(all_users)
    
    return jsonify({"message": "Users retrieved successfully", "data": serialized_users}), 200


def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    serialized_user = user_schema.dump(user) 
    print(serialized_user['id'])

    # # Method to check if a given password is correct
    def check_password():
        print(f"password: {password}")
        print(f"password: {serialized_user['password_hash']}")
        valid = flask_bcrypt.check_password_hash(serialized_user['password_hash'], password)
        print(f"valid: {valid}")
        return valid
    
    if user:
        # Create an access token with the user's identity
        access_token = create_access_token(identity=serialized_user['id'])
        return jsonify({'access_token': access_token, 'data': user_schema.dump(user)}), 200
    else:    
        return jsonify({'message': 'Invalid username or password'}), 401

def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if username or email already exist
    existing_user = User.query.filter_by(username=username).first()
    existing_email = User.query.filter_by(email=email).first()

    if existing_user or existing_email:
        return jsonify({'message': 'Username or email already exists'}), 400

    # Hash the password
    hashed_password =  flask_bcrypt.generate_password_hash(password, 10).decode('utf-8')

    # Create a new user and save to the database
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()


    return jsonify({'message': 'User registered successfully', 'data': user_schema.dump(new_user) }), 201