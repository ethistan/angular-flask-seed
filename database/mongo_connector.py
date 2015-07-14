import ConfigParser
import sys
import os

from flask import json, current_app
from mongokit import ConnectionError, Connection
from bson.objectid import ObjectId
from bson import json_util


environment = os.environ.get("ENV", "dev")
config = ConfigParser.RawConfigParser()
config.read("config/" + environment + "/app.cfg")


class Database:
    def __init__(self):
        self.database = None
        self.connection = None

    def connect(self, env=None):
        section_name = "Mongo"
        if env or (current_app and current_app.config["TESTING"]):
            section_name += " Test"

        mongodb_uri = "mongodb://"

        if config.has_option(section_name, "user"):
            mongodb_uri += config.get(section_name, "user") + ":" + config.get(section_name, "password") + "@"

        mongodb_uri += config.get(section_name, "host") + ":" + config.get(section_name, "port")
        db_name = config.get(section_name, "database")

        try:
            self.connection = Connection(mongodb_uri)
            self.database = self.connection[db_name]

        except ConnectionError:
            print('Error: Unable to connect to database.')
            sys.exit(1)

    def close(self):
        self.connection.close()

    def clean(self):
        for collection_name in self.database.collection_names():
            if collection_name not in ["system.indexes"]:
                self.database[collection_name].remove({})

    @staticmethod
    def dump_object(json_object):
        return json.dumps(json_object, default=json_util.default)

    @staticmethod
    def create_bson_id_from_object(data):
        try:
            data["_id"] = ObjectId(str(data["id"]))
            del data["id"]
        except KeyError:
            # This just means it is a new object, not an existing one
            pass
        return data

    @staticmethod
    def create_bson_id_from_string(string):
        try:
            string = ObjectId(string)
        except KeyError:
            # This just means it is a new object, not an existing one
            pass
        return string

    @staticmethod
    def extract_bson_id(data):
        try:
            data["id"] = str(data["_id"])
            del data["_id"]
        except KeyError:
            # This just means it is a new
            pass
        return data

    def get_collection(self, collection_name):
        return self.database[collection_name]

    def get_data(self, collection_name, dump=True, criteria=None, selection=None, sort=None, extract_id=True):
        collection = self.get_collection(collection_name)

        if not sort:
            sort = [('_id', 1)]
        if not criteria:
            criteria = {}

        data_list = []

        for entry in collection.find(criteria, selection).sort(sort):
            if extract_id:
                entry = self.extract_bson_id(entry)
            data_list.append(entry)

        if dump:
            return self.dump_object
        else:
            return data_list

    def get_single_data(self, collection_name, dump=True, criteria=None, selection=None, sort=None, extract_id=True):
        data = self.get_data(collection_name,
                             dump=False,
                             criteria=criteria,
                             selection=selection,
                             sort=sort,
                             extract_id=extract_id)

        if len(data) > 0:
            data = data[0]
        else:
            data = {}

        if dump:
            return self.dump_object
        else:
            return data

    def get_distinct(self, collection_name, dump=True, criteria=None, selection=None, distinct="", sort=None):
        collection = self.get_collection(collection_name)
        if not sort:
            sort = [('_id', 1)]
        if not criteria:
            criteria = {}

        data_list = []

        for entry in collection.find(criteria, selection).sort(sort).distinct(distinct):
            entry = self.extract_bson_id(entry)
            data_list.append(entry)

        if dump:
            return self.dump_object
        else:
            return data_list

    def save(self, collection_name, data):
        collection = self.get_collection(collection_name)

        if "id" in data:
            data = self.create_bson_id_from_object(data)
        return collection.save(data)

    def update(self, collection_name, element_id, new_data):
        data = self.get_data(collection_name, criteria={"_id": element_id}, dump=False)[0]

        for d in new_data.keys():
            data[d] = new_data[d]

        self.save(collection_name, data)

    def remove(self, collection_name, data):
        collection = self.get_collection(collection_name)
        collection.remove(data)
