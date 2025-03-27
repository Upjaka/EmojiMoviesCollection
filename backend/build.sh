#!/usr/bin/env bash

pip install -r requirements.txt

echo "Running collectstatic..."
python manage.py collectstatic --noinput | tee collectstatic.log

echo "Running makemigrations..."
python manage.py makemigrations | tee makemigrations.log

echo "Running migrate..."
python manage.py migrate | tee migrate.log

echo "Build script completed!"

