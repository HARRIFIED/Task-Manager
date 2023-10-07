from flask import Blueprint
from Controller.tasks import create_task, get_tasks, get_task

# Create a Blueprint for routes
add_task_bp = Blueprint('add_task_bp', __name__)
tasks_bp = Blueprint('tasks_bp', __name__)
task_bp = Blueprint('task_bp', __name__)

@add_task_bp.route('/api/add_task', methods=['POST'])
def add_task():
    return create_task()


@tasks_bp.route('/api/tasks', methods=['GET'])
def fetch_tasks():
    return get_tasks()


@tasks_bp.route('/api/task/<id>', methods=['GET'])
def fetch_task(id):
    return get_task(id)

