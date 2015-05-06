import os

from flask.ext.testing import TestCase

import server


environment = os.environ.get("ENV", "dev")


class ServerTestCase(TestCase):
    def create_app(self):
        server.app.config['TESTING'] = True
        server.mongo.connect(env="Test")
        return server.app

    def setUp(self):
        server.mongo.clean()

    def test_index_page(self):
        rv = self.client.get('/')
        self.assertTrue(rv.data.find("CCG Sample App"))

