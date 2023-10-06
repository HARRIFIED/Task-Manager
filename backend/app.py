from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config import Config  # Import the Config class from config
from Models.tasks import Task, task_schema
from Routes.tasks import task_bp  
import Models
db = Models.db
ma = Models.ma


# Initialize app
app = Flask(__name__)

# Load configurations from Config class
app.config.from_object(Config)

# Initialize extensions``
db.init_app(app)
ma.init_app(app)


# Database initialization function
def initialize_database():
    with app.app_context():
        db.create_all()

# Run the database initialization function
initialize_database()

# Register the Blueprints
app.register_blueprint(task_bp)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
