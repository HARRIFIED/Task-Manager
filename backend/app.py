from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from config import Config  # Import the Config class from config
from Models.tasks import Task, task_schema
from Routes.tasks import tasks_bp, add_task_bp, task_bp, update_task_bp, delete_task_bp
from Routes.user import login_bp, register_bp, user_bp
import Models
db = Models.db
ma = Models.ma
flask_bcrypt  = Models.flask_bcrypt 


# Initialize app
app = Flask(__name__)

# Load configurations from Config class
app.config.from_object(Config)

# Initialize extensions``
db.init_app(app)
ma.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
flask_bcrypt.init_app(app)


# Database initialization function
def initialize_database():
    with app.app_context():
        db.create_all()

# Run the database initialization function
initialize_database()

# Register the Blueprints
app.register_blueprint(add_task_bp)
app.register_blueprint(tasks_bp)
app.register_blueprint(task_bp)
app.register_blueprint(update_task_bp)
app.register_blueprint(login_bp)
app.register_blueprint(register_bp)
app.register_blueprint(user_bp)


# Run the app
if __name__ == '__main__':
    app.run(debug=True)
