from app import app, api
from .endpoints.hello import HelloWorld
from .endpoints.pdfgen import PdfGenerator

# add api endpoints
api.add_resource(HelloWorld, "/api/hello")
api.add_resource(PdfGenerator, "/api/pdfgen")