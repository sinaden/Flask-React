from flask import Flask, send_from_directory
from flask_restful import Api, Resource
#from flask_cors import CORS #comment this on deployment

import pandas as pd
from data_module import Data
import json

app = Flask(__name__, static_url_path='', static_folder='frontend/my-app/build')
#CORS(app) # comment on deployment

api = Api(app)
dataHandler = Data()

class HelloWorld(Resource):
    def get(self, name):
        return {"name": name}

    def post(self):
        return {"data":"posted World"}


class Search(Resource):

    def get(self, column, text, pagination = '0'):
        res = dataHandler.search(column.lower(),text, pagination)
        j_object = json.loads(res)
        return j_object

    def post(self):
        return {"data":"posted World"}



@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

# register the resource
api.add_resource(HelloWorld, "/helloworld/<string:name>")
api.add_resource(Search, "/search/<string:column>/<string:text>", "/search/<string:column>/<string:text>/<string:pagination>")
dataHandler.data_handling()

