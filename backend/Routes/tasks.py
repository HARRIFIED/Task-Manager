from flask import Blueprint
from Controller.tasks import create_task

# Create a Blueprint for routes
task_bp = Blueprint('task_bp', __name__)

@task_bp.route('/api/add_task', methods=['POST'])
def add_task():
    return create_task()
