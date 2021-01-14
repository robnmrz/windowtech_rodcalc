from app import app, api
from .endpoints.hello import HelloWorld

# add api endpoints
api.add_resource(HelloWorld, "/hello")

@app.route('/')
def index():
    return "Hello From Flask"