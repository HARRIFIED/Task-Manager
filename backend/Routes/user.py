from flask import Blueprint
from Controller.user import login, register, get_users

# Create a Blueprint for routes
login_bp = Blueprint('login_bp', __name__)
register_bp = Blueprint('register_bp', __name__)
user_bp = Blueprint('user_bp', __name__)

@login_bp.route('/api/login', methods=['POST'])
def signIn():
    return login()

@register_bp.route('/api/register', methods=['POST'])
def signUp():
    return register()

@user_bp.route('/api/users', methods=['GET'])
def users():
    return get_users()

