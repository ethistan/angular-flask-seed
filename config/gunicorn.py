import os


def init_config(env=None):
    config_file = "config/default_setting.py"
    config = open(config_file)
    lines = config.readlines()

    if env:
        config_file = "config/" + env + "/custom_setting.py"
        config = open(config_file)

        for line in config.readlines():
            lines.append(line)

    return lines


def get_bind():
    config = init_config()

    for line in config:
        line = line.rstrip()
        comp = line.split(" = ")[-1]
        comp = comp.strip("\"")

        if line.startswith("SERVER_NAME"):
            binding = comp
        elif line.startswith("PORT"):
            binding = "localhost:" + comp

    return binding


def get_debug():
    log_level = ""

    configs = [init_config(), init_config(os.environ.get("ENV", "dev"))]
    for config in configs:
        for line in config:
            line = line.rstrip()
            if line.startswith("DEBUG"):
                debug = line.split(" = ")[-1]

                if debug == "True":
                    log_level = "debug"
                else:
                    log_level = "info"

    return log_level

daemon = True
bind = get_bind()
loglevel = get_debug()
timeout = 1000
workers = 4
pidfile = "gunicorn.pid"
errorlog = "logs/gunicorn-error.log"
accesslog = "logs/gunicorn-access.log"