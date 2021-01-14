#!/bin/sh 

set -e

# collecting static files
python manage.py collectstatic --noinput

# run as tcp socket on port 8000, enable multithreading an loads in wsgi file
uwsgi --socket :8000 --master --enable-threads --module app.wsgi