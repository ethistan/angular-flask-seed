import ConfigParser
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.sql_models.person import Person

config = ConfigParser.RawConfigParser()
config.read("config/app.cfg")


class Database:
    def __init__(self):
        host = config.get("Postgres", "host")
        port = config.get("Postgres", "port")
        db_name = config.get("Postgres", "database")
        username = config.get("Postgres", "username")
        password = config.get("Postgres", "password")

        engine = create_engine('postgresql://%s:%s@%s:%s/%s' % (username, password, host, port, db_name))

        self.table_map = {
            "person": Person
        }

        self.session = sessionmaker(bind=engine)

    def save(self, table, data):
        new_element = self.table_map[table](data)

        session = self.session()
        session.add(new_element)
        session.commit()

        return new_element




