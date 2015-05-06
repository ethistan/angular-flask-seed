import os

from flask import Flask, make_response, g, send_file, abort
from flask.ext.mail import Mail

from blueprints.information import information
from database.mongo_connector import Database as Mongo


environment = os.environ.get("ENV", "dev")

app = Flask(__name__)
app.config.from_object("config.default_setting")
app.config.from_object("config." + environment + ".custom_setting")

mail = Mail(app)
mongo = Mongo()

app.register_blueprint(information)


@app.before_request
def before_request():
    g.mongo = mongo
    g.mongo.connect()

    g.mail = mail.init_app(app)


@app.teardown_request
def teardown_request(exception):
    if exception:
        print "Closing database connection error:", exception
    else:
        db = getattr(g, 'mongo', None)
        if db is not None:
            db.close()


@app.route("/")
def index():
    if environment in ["staging", "production"]:
        # This allows the file to be cached instead of reloading it each time like we want on dev.
        return send_file('html/index.html')
    else:
        return make_response(open('html/index.html').read())


@app.route("/test")
def test():
    if environment in ["sandbox", "dev"]:
        # This allows the file to be cached instead of reloading it each time like we want on dev.
        return make_response(open('html/test.html').read())
    else:
        abort(404)


@app.route("/mock.js")
def get_mock():
    if environment in ["sandbox", "dev"]:
        # This allows the file to be cached instead of reloading it each time like we want on dev.
        return make_response(open('test/e2e/e2e-mocks.js').read())
    else:
        abort(404)


@app.route("/mock/<mock_name>")
def get_individual_mock(mock_name):
    if environment in ["sandbox", "dev"]:
        # This allows the file to be cached instead of reloading it each time like we want on dev.
        return make_response(open('test/e2e/mocks/' + mock_name).read())
    else:
        abort(404)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5005)