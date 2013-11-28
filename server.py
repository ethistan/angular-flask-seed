import ConfigParser
import random
import math
from bson import json_util

import requests

from flask import Flask, make_response, request, json
from database.mongo_connector import Database as Mongo
from database.postgres_connector import Database as Postgres


app = Flask(__name__)
mongo_db = Mongo()
psql_db = Postgres()

config = ConfigParser.RawConfigParser()
config.read("config/app.cfg")


def dump_object(json_object):
    return json.dumps(json_object, default=json_util.default)


@app.route("/")
def index():
    #Use the below in production, as it allows cacheing of files
    #return send_file('html/index.html')

    return make_response(open('html/index.html').read())


@app.route("/google")
def google():
    #This is an example of a GET request from another server
    return requests.get("http://www.google.com").content


@app.route("/api/saveInformation", methods=["POST"])
def save_information():
    data = request.json

    mongo_id = mongo_db.save("person", data)
    person = mongo_db.get_single_data("person", dump=False, criteria={"_id": mongo_id})

    sql_person = psql_db.save("person", {"name": data["name"], "title": data["title"]})

    return dump_object({
        "status": "success",
        "mongo": str(person),
        "postgres": str(sql_person)
    })


@app.route("/api/getInformation", methods=["GET"])
def get_information():
    values = []

    for i in xrange(10):
        values.append({
            "label": "Random Number " + str(i) + ":",
            "value": math.floor(random.random() * 10)
        })

    return json.dumps(values)


if __name__ == "__main__":
    app.debug = True

    host = config.get("Flask", "host")
    port = config.get("Flask", "port")

    app.run(host, int(port))
