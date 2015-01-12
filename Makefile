# Makefile
SHELL := /bin/bash

build: requirements.txt
	test -d venv || python virtualenv-12.0.5/virtualenv.py -p python2.7 venv

	source venv/bin/activate; pip install -r requirements.txt
	touch venv/bin/activate

	npm install --cache .npm

update:
	source venv/bin/activate; pip install -Ur requirements.txt

kill:
	test ! -f gunicorn.pid || kill `cat gunicorn.pid`; exit 0

run:
	source venv/bin/activate; gunicorn server:app -c config/gunicorn.py; deactivate; exit 0

local:
	source venv/bin/activate; python server.py; deactivate; exit 0

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
