# Makefile

venv: venv/bin/activate

venv/bin/activate: requirements.txt
	test -d venv || virtualenv --distribute venv

	. venv/bin/activate; pip install -Ur requirements.txt
	touch venv/bin/activate

	npm install karma
	npm install karma-junit-reporter --save-dev
	npm install karma-ng-scenario --save-dev

clean:
	rm -rf venv