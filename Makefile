# Makefile

build: requirements.txt
	test pip || easy_install pip
	test virtualenv || pip install virtualenv
	test -d venv || virtualenv venv

	source venv/bin/activate; pip install -r requirements.txt
	touch venv/bin/activate

	test karma || npm install karma; npm install karma-junit-reporter --save-dev; npm install karma-ng-scenario --save-dev

update:
	source venv/bin/activate; pip install -Ur requirements.txt

kill:
	test ! -f gunicorn.pid || kill `cat gunicorn.pid`; exit 0

run:
	source venv/bin/activate; gunicorn server:app -c config/gunicorn.py; deactivate; exit 0

clean:
	rm -rf venv
	rm -rf node_modules

test: unit pythontest e2e-test

pythontest:
	source venv/bin/activate; scripts/python.sh; deactivate; exit 0

unit:
	scripts/test.sh; exit 0

e2e-test:
	scripts/e2e-test.sh; exit 0
