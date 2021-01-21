from flask import Flask
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # speciality for localhost testing

api = Api(app)

from app import views