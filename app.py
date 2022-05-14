from flask import Flask, jsonify, request, send_from_directory
from flask_restful import Api, Resource
#from flask_cors import CORS #comment this on deployment

import pandas as pd
from data_module import Data
import json

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
#CORS(app) # comment on deployment

api = Api(app)
dataHandler = Data()

# Simple search, for the first phase of the project, 
# Search via get and only one column, no longer being used in UI 
# but still working through postman 
class Search(Resource):

    def get(self, column, text, pagination = '0'):
        res = dataHandler.search(column.lower(),text, pagination)
        j_object = json.loads(res)
        return j_object

class UpgradedSearch(Resource):

    def post(self):
        json_data = request.get_json(force=True)
        cols = json_data['cols']
        terms = json_data['terms']
        pagination = json_data['pagination']

        print(cols)
        print(terms)
        cols = json.loads(cols)
        terms = json.loads(terms)

        res = dataHandler.advanced_search(cols,terms, pagination)
        j_object = json.loads(res)
        return j_object

class DataAccess(Resource):

    def get(self, pagination = '0'):
        res = dataHandler.get_all(pagination)
        j_object = json.loads(res)
        return j_object

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

# register the resource
api.add_resource(UpgradedSearch, "/usearch")
api.add_resource(DataAccess, "/all", "/all/<string:pagination>")
api.add_resource(Search, "/search/<string:column>/<string:text>", "/search/<string:column>/<string:text>/<string:pagination>")
dataHandler.data_handling()

