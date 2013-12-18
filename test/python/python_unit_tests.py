import unittest
import os
import server

environment = os.environ.get("ENV", "dev")


class SeverTestCase(unittest.TestCase):
	psql_db = None

	def setUp(self):
		self.app = server.app.test_client()
		server.init_db("Test")
		self.psql_db.clean_test_database()

	def test_index_page(self):
		rv = self.app.get('/')
		self.assertRegexpMatches(rv.data, "Server")

	def test_ccg_id_creation(self):
		rv = self.app.post("/api/createCCGId")
		print "Response:", rv.data