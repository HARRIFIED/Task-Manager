from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps

def authentication_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            # Check if a valid JWT token is present in the request headers
            jwt_token = request.headers.get('Authorization')
            if not jwt_token:
                return jsonify({"message": "Authentication required"}), 401

            # Verify and decode the JWT token
            current_user = get_jwt_identity()
            if not current_user:
                return jsonify({"message": "Unauthorized: Pleas login"}), 401

            # Continue to the route function if authentication is successful
            return func(*args, **kwargs)
        except Exception as e:
            return jsonify({"message": "An error occurred during authentication", "error": str(e)}), 500

    return wrapper
