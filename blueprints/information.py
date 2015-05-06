import json
import random
import math

from flask import Blueprint, request, g
import requests


__author__ = 'peterbudd'

information = Blueprint('information', __name__, template_folder="templates")


@information.route("/google")
def google():
    # This is an example of a GET request from another server
    return requests.get("http://www.google.com").content


@information.route("/api/saveInformation", methods=["POST"])
def save_information():
    data = request.json

    mongo_id = g.mongo.save("person", data)
    person = g.mongo.get_single_data("person", dump=False, criteria={"_id": mongo_id})

    return g.mongo.dump_object({
        "status": "success",
        "mongo": str(person)
    })


@information.route("/api/getInformation", methods=["GET"])
def get_information():
    values = []

    for i in xrange(10):
        values.append({
            "label": "Random Number " + str(i) + ":",
            "value": math.floor(random.random() * 10)
        })

    return json.dumps(values)
