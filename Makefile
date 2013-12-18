# Makefile

build: requirements.txt
	test pip || easy_install pip
	test virtualenv || pip install virtualenv
	test -d venv || virtualenv venv

	source venv/bin/activate; pip install -r requirements.txt
	touch venv/bin/activate

	npm install karma
	npm install karma-junit-reporter --save-dev
	npm install karma-ng-scenario --save-dev

update:
	source venv/bin/activate; pip install -Ur requirements.txt

kill:
	test ! -f gunicorn.pid || kill  $(cat gunicorn.pid); exit 0

kill_local:
	test ! -f gunicorn.pid || pid=(cat gunicorn.pid) ; kill $pid; exit 0

run:
	source venv/bin/activate ; gunicorn server:app -b 0.0.0.0:5000 -p gunicorn.pid -w 4 -D ; deactivate; exit 0

run_local:
	source venv/bin/activate ; gunicorn server:app -b localhost:5000 -p gunicorn.pid -w 4 -D ; deactivate; exit 0

clean:
	rm -rf venv
	rm -rf node_modules

unit:
	source venv/bin/activate; nosetests -s; deactivate
	scripts/test.sh

test: unit

e2e-test:
	scripts/e2e-test.sh
