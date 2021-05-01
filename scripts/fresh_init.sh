#!/bin/bash

source venv/bin/activate
rm -rf db.sqlite3

find . -path "*migrations*" -name "*.py" -not -path "*__init__*" -not -path "./venv?*" -delete

sudo -u postgres bash -c "psql -c \"DROP DATABASE quiz_db;\""
sudo -u postgres bash -c "psql -c \"CREATE DATABASE quiz_db;\""
# sudo -u postgres bash -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE quiz_db to postgres;\""

python manage.py makemigrations
python manage.py migrate --run-syncdb --database default
python manage.py makesuper
# python manage.py loaddata categories coupons
python manage.py runserver