import pytest
from app import app, db, initialize_database, flask_bcrypt


@pytest.fixture(scope='module')
def test_app():
    app.config['TESTING'] = True
    
    # SQLite in-memory database for testing
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.app_context(): 
        initialize_database()
          
    yield app  

    # # Teardown: remove the test database
    with app.app_context():
        db.drop_all()


@pytest.fixture(scope='module')
def client(test_app):
    return test_app.test_client()



def teardown_module(module):
    # Perform cleanup, if needed, after all tests in the module are run
    pass
