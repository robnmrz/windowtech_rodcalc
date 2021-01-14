from flask import request, jsonify
from app import api
import json

from flask_restful import Resource

class HelloWorld(Resource):
    def post(self):
        data = json.loads(request.data)
        name = data['name']
        return jsonify(data)
        