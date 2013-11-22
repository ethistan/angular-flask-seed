from flask import Flask, make_response

app = Flask(__name__)

@app.route("/")
def index():
    #Use the below in production, as it allows cacheing of files
    #return send_file('templates/index.html')

    return make_response(open('html/index.html').read())

if __name__ == "__main__":
    app.debug = True
    app.run()