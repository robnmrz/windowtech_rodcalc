from app import app, api
from .endpoints.hello import HelloWorld
from .endpoints.pdfgen import PdfGenerator

# add api endpoints
api.add_resource(HelloWorld, "/hello")
api.add_resource(PdfGenerator, "/pdfgen")

@app.route('/')
def index():
    return "Hello From Flask"