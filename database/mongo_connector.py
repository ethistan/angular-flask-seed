import ConfigParser
import sys
from flask import json
from mongokit import ConnectionError, Connection
from bson.objectid import ObjectId
from bson import json_util
from database.mongo_models.person import Person

config = ConfigParser.RawConfigParser()
config.read("config/app.cfg")


class Database:
    def __init__(self):
        mongodb_uri = ":".join([config.get("Mongo", "host"), config.get("Mongo", "port")])
        db_name = config.get("Mongo", "database")

        try:
            connection = Connection(mongodb_uri)
            connection.register([Person])
            self.database = connection[db_name]
        except ConnectionError:
            print('Error: Unable to connect to database.')
            sys.exit(1)

    @staticmethod
    def dump_object(json_object):
        return json.dumps(json_object, default=json_util.default)

    @staticmethod
    def create_bson_id_from_object(data):
        try:
            data["_id"] = ObjectId(str(data["id"]))
            del data["id"]
        except KeyError:
            #This just means it is a new object, not an existing one
            pass
        return data

    @staticmethod
    def create_bson_id_from_string(string):
        try:
            string = ObjectId(string)
        except KeyError:
            #This just means it is a new object, not an existing one
            pass
        return string

    @staticmethod
    def extract_bson_id(data):
        try:
            data["id"] = str(data["_id"])
            del data["_id"]
        except KeyError:
            #This just means it is a new
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
            return self.dump_object(data_list)
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

        if dump:
            return self.dump_object(data)
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
            return self.dump_object(data_list)
        else:
            return data_list

    def save(self, collection_name, data):
        collection = self.get_collection(collection_name)
        return collection.save(data)

    def update(self, collection_name, element_id, new_data):
        data = self.get_data(collection_name, criteria={"_id": element_id}, dump=False)[0]

        for d in new_data.keys():
            data[d] = new_data[d]

        self.save(collection_name, data)

    def remove(self, collection_name, data):
        collection = self.get_collection(collection_name)
        collection.remove(data)
