# REST API With Flask & SQL Alchemy

> Products API using Python Flask, SQL Alchemy and Marshmallow

## Quick Start Using Pipenv


``` bash
# Clone repo
$ git clone https://github.com/HARRIFIED/Task-Manager.git


``` bash
# enter the backend directory
$ cd backend


``` bash
# Activate venv
$ pipenv shell

# Install dependencies
$ pipenv install

# Run Server (http://localhst:5000)
python app.py

# Run test
pytest
```


## Endpoints

* GET     /api/tasks
* GET     /api/task/:id
* POST    /api/add_task
* PUT     /api/update_task/:id
* DELETE  /api/delete_task/:id
* POST    /api/login
* POST    /api/register
# Client with React and Vite