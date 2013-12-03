# Makefile

venv: venv/bin/activate

venv/bin/activate: requirements.txt
	test -d venv || virtualenv --distribute venv

	. venv/bin/activate; pip install -Ur requirements.txt
	touch venv/bin/activate

	test npm || brew install node
	npm install karma

clean:
	rm -rf venv