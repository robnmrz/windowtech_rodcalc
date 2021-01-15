from flask import request, jsonify
import json

from flask_restful import Resource

class HelloWorld(Resource):
    def post(self):
        data = json.loads(request.data)
        return jsonify(data)
        