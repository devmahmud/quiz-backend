#!/bin/bash

source venv/bin/activate
rm -rf db.sqlite3

find . -path "*migrations*" -name "*.py" -not -path "*__init__*" -not -path "./venv?*" -delete

# sudo -u postgres bash -c "psql -c \"DROP DATABASE db_name;\""
# sudo -u postgres bash -c "psql -c \"CREATE DATABASE db_name;\""
# sudo -u postgres bash -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE db_name to admin;\""

python manage.py makemigrations
python manage.py migrate --run-syncdb --database default
python manage.py makesuper
python manage.py loaddata categories coupons
python manage.py runserver