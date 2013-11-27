from sqlalchemy import Column, Integer, String, Sequence

from base import Base


class Person(Base):
    __tablename__ = "person"

    id = Column(Integer, Sequence('person_id_seq'), primary_key=True)
    title = Column(String(120), unique=False)
    name = Column(String(80), unique=False)

    def __init__(self, data):
        self.title = data["title"]
        self.name = data["name"]

    def __repr__(self):
        return '<Person (id=%s, title=%s, name=%s)>' % (self.id, self.title, self.name)