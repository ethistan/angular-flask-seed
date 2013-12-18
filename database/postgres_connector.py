import ConfigParser
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.sql_models.base import Base
from database.sql_models.person import Person

environment = os.environ.get("ENV", "dev")


class Database:
    def __init__(self, env=None):
        config = ConfigParser.RawConfigParser()

        config.read("config/" + environment + ".app.cfg")

        section_name = "Postgres"
        if env:
            section_name += " " + env

        host = config.get(section_name, "host")
        port = config.get(section_name, "port")
        db_name = config.get(section_name, "database")
        username = config.get(section_name, "username")
        password = config.get(section_name, "password")

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





