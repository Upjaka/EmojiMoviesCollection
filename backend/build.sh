#!/usr/bin/env bash

set -e  # Stop the script if any command fails

pip install -r requirements.txt

echo "Running collectstatic..."
python manage.py collectstatic --noinput | tee collectstatic.log

echo "Running makemigrations..."
python manage.py makemigrations --verbosity 2 | tee /dev/stderr

echo "Running migrate..."
python manage.py migrate --verbosity 2 | tee /dev/stderr

echo "Build script completed!"
