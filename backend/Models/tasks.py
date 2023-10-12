from datetime import datetime
from Models import db, ma,  flask_bcrypt
 

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)  # Store the hashed password
    tasks = db.relationship('Task', backref='user', lazy=True)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password_hash = self._hash_password(password)  # Hash the password

    # Method to hash the password using  flask_bcrypt
    def _hash_password(self, password):
        return  flask_bcrypt.generate_password_hash(password).decode('utf-8')

    # Method to check if a given password is correct
    def check_password(self, password):
        return  flask_bcrypt.check_password_hash(self.password_hash, password)

# Task model 
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300))
    due_date = db.Column(db.String)
    status = db.Column(db.String(20), default='NOT STARTED')
    priority = db.Column(db.String(20), default='LOW')
    tags = db.Column(db.String(20), default='NONE')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name='task_user_fk'))

    def __init__(self, title, description=None, due_date=None, status='NOT STARTED', priority='LOW', tags='None', user_id=None):
        self.title = title
        self.description = description
        self.due_date = due_date
        self.status = status
        self.priority = priority
        self.tags = tags
        self.user_id = user_id if user_id is not None else 1 

# Task schema 
class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'due_date', 'status', 'priority', 'tags', 'created_at', 'updated_at', 'user_id')

# Task schema 
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'email', 'password_hash')

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)
