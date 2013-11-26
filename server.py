import requests
from flask import Flask, make_response, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    #Use the below in production, as it allows cacheing of files
    #return send_file('html/index.html')

    return make_response(open('html/index.html').read())


@app.route("/google")
def google():
    return requests.get("http://www.google.com").content


@app.route("/api/saveInformation", methods=["POST"])
def save_information():
    print "Data:", request.json

    return


if __name__ == "__main__":
    app.debug = True
    app.run()