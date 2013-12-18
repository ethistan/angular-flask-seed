import multiprocessing
import ConfigParser
import os


def init_config():
	config = ConfigParser.RawConfigParser()
	env = os.environ.get("ENV", "dev")
	config.read("config/" + env + ".app.cfg")
	return config


def get_bind():
	config = init_config()
	return config.get("Flask", "host") + ":" + config.get("Flask", "port")


def get_debug():
	config = init_config()
	debug = config.get("Flask", "debug")
	if debug:
		return "info"
	else:
		return "error"


daemon = True
bind = get_bind()
loglevel = get_debug()
workers = multiprocessing.cpu_count() * 2 + 1
pidfile = "gunicorn.pid"
errorlog = "logs/gunicorn-error.log"
accesslog = "logs/gunicorn-access.log"

