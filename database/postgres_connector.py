import ConfigParser
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.sql_models.base import Base
from database.sql_models.person import Person

env = os.environ.get("ENV", "dev")
print "ENV:", env
config = ConfigParser.RawConfigParser()
config.read("config/" + env + ".app.cfg")


class Database:
    def __init__(self):
        host = config.get("Postgres", "host")
        port = config.get("Postgres", "port")
        db_name = config.get("Postgres", "database")
        username = config.get("Postgres", "username")
        password = config.get("Postgres", "password")

        print "Connecting to:", 'postgresql://%s:%s@%s:%s/%s' % (username, password, host, port, db_name)

        self.engine = create_engine('postgresql://%s:%s@%s:%s/%s' % (username, password, host, port, db_name))
        self.session = sessionmaker(bind=self.engine)

        self.table_map = {
            "person": Person
        }

        #Go through and create the tables if they do not exist. If they do, nothing happens
        Base.metadata.create_all(self.engine)

    def save(self, table, data):
        new_element = self.get_table(table)(data)

        session = self.session()
        session.add(new_element)
        session.commit()

        return new_element

    def get_table(self, table):
        return self.table_map[table]

    def list_columns(self, table):
        table = self.get_table(table)

        return table.__table__.columns





