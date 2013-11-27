from mongokit.document import Document


class Person(Document):
    __collection__ = 'person'
    structure = {
        'name': basestring,
        'title': basestring
    }

    use_dot_notation = True