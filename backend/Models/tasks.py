from datetime import datetime
from Models import db, ma

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(300))
    due_date = db.Column(db.String)
    status = db.Column(db.String(20), default='NOT STARTED')
    priority = db.Column(db.String(20), default='LOW')
    tags = db.Column(db.String(20), default='NONE')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, title, description=None, due_date=None, status='NOT STARTED', priority='LOW', tags='None'):
        self.title = title
        self.description = description
        self.due_date = due_date
        self.status = status  
        self.priority = priority
        self.tags = tags

# Task schema
class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'due_date', 'status', 'priority', 'tags', "created_at", "updated_at") 

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)
