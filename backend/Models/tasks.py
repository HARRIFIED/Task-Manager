from datetime import datetime
from Models import db, ma

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(300))
    due_date = db.Column(db.String)

    def __init__(self, title, description=None, due_date=None):
        self.title = title
        self.description = description
        self.due_date = due_date

# Define a data schema for a simple object 
class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'due_date')

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

