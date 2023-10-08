from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

# Initialize extensions``
db = SQLAlchemy()
ma = Marshmallow()
flask_bcrypt  = Bcrypt()