Angular Flask Seed - Peter Budd

This project is designed to be a starting point for using the Angular web framework as a client side management system with a Python Flask web-services framework.

It uses jQuery, a Garvan customised bootstrap visual style and the LESS framework for compiling CSS files.

For those unfamiliar with Angular, Flask, jQuery, Bootstrap or LESS; documentation for these frameworks can be found at the following:

<ul>
    <li> <a href="http://angularjs.org/">Angular</a></li>
    <li> <a href="http://flask.pocoo.org/">Flask</a></li>
    <li> <a href="http://jquery.com/">JQuery</a></li>
    <li> <a href="http://getbootstrap.com/">Bootstrap</a></li>
    <li> <a href="http://lesscss.org/">Less</a></li>
</ul>

<h1>Installation Instruction</h1>

<h2>Requirements</h2>
<ul>
    <li>MongoDB</li>
    <li>Python 2.7</li>
</ul>

<h2>Cleaning the Environment</h2>

The virtual environment can be cleaned by running the `make clean` command

<h2>Initial Setup</h2>

run `make install` to setup the python virtual environment, install the python modules and node modules needed for running and testing

<h2>Configuration</h2>

All config files are location within the `config` directory.

The base configuration for the flask server is `default_setting.py`.

The base configuration for the gunicorn load balancer is `gunicorn.py`.

The javascript unit test configuration file is `karma.conf.js`.

The end to end test configuration file is `karma-e2e.conf.js`.

Environment based settings that override the default settings are located in their respective config/\<environment\> folder.

<h2>Testing Suite</h2>

All the testing code can be found in the `test` folder under the respective testing types.

run `make test` to run the full suite of unit, python unit and acceptance tests

run `make unit` to run just the unit tests

run `make pythontest` to run just the python unit tests

run `make e2e-test` to run just the end to end acceptance tests

All testing suites write their testing output xml files to `test_out`.

<h2>Run Locally</h2>

run `make local` to launch the Flask server in local debug mode (single threaded).

<h2>Run Production Mode</h2>

run `make run` to launch the Flask server via the gunicorn wrapper with 4 worker nodes.

run `make kill` to stop the gunicorn wrapper.

<h2>Run in Environment</h2>

Both `make local` and `make run` can be launched in a specific environment by appending ` ENV=environmentName` to the make command.