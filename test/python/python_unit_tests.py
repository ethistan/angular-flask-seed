import unittest
import os
import server

environment = os.environ.get("ENV", "dev")


class ServerTestCase(unittest.TestCase):
	psql_db = None

	def setUp(self):
		self.app = server.app.test_client()
		server.init_db("Test")
		# server.psql_db.clean_test_database()

	def test_index_page(self):
		rv = self.app.get('/')
		unittest.TestCase.assertRegexpMatches(self, rv.data, "CCG Sample App")
