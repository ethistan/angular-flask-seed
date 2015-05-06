import os


<<<<<<< Updated upstream
def init_config():
    config = ConfigParser.RawConfigParser()
    env = os.environ.get("ENV", "dev")
    config.read("config/" + env + "/app.cfg")
    return config
=======
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
>>>>>>> Stashed changes


def get_bind():
    config = init_config()
<<<<<<< Updated upstream
    binding = config.get("Flask", "host") + ":" + config.get("Flask", "port")
    print "Binding"
=======
    binding = ""
    for line in config:
        line = line.rstrip()
        comp = line.split(" = ")[-1]
        comp = comp.strip("\"")

        if line.startswith("SERVER_NAME"):
            binding = comp
        elif line.startswith("PORT"):
            binding = "localhost:" + comp

>>>>>>> Stashed changes
    return binding


def get_debug():
<<<<<<< Updated upstream
    config = init_config()
    debug = config.get("Flask", "debug")
    if debug:
        return "info"
    else:
        return "debug"
=======
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
>>>>>>> Stashed changes


daemon = True
bind = get_bind()
loglevel = get_debug()
timeout = 1000
workers = 4
pidfile = "gunicorn.pid"
errorlog = "logs/gunicorn-error.log"
accesslog = "logs/gunicorn-access.log"