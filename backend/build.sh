#!/usr/bin/env bash

pip install -r requirements.txt

echo "Running collectstatic..."
python manage.py collectstatic --noinput | tee collectstatic.log

echo "Running makemigrations..."
python manage.py makemigrations 2>&1 | tee /dev/stderr

echo "Running migrate..."
python manage.py migrate 2>&1 | tee /dev/stderr

echo "Build script completed!"

