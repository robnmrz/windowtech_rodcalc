from flask import request, make_response, render_template
import json
from flask_restful import Resource

from weasyprint import HTML, CSS
from weasyprint.fonts import FontConfiguration

class PdfGenerator(Resource):
    def get(self):
        #data = json.loads(request.data)
        data = {
            "height": "1000",
            "width": "1000",
            "variant": "vertical",
            "product": "F1200",
            "xshift": None,
            "yshift": None
        }

        # default values and add offsets if not None
        HOR_F1200_MK = 422. + float(data.xshift if data.xshift != None else 0)
        VER_F1200_MK = 170. + float(data.yshift if data.yshift != None else 0)

        # basic components
        measure_rh_a = (float(data.width) / 2) - 123.
        measure_rh_b = float(data.width) - 307.
        measure_rv_a = (float(data.height) / 2) - 225.
        measure_rv_b = float(data.height) - 409.

        # optional component horizontal
        measure_rh_no_MV = HOR_F1200_MK - 175.
        # optional component horizontal and MV
        measure_rh_MV_a = HOR_F1200_MK - 225.
        measure_rh_MV_b = (float(data.width) / 2) - 74.

        measures = []

        # add basic rods
        measures.append(measure_rh_a, measure_rh_b)
        measures.append(measure_rv_a, measure_rv_b)

        # select optional rods
        if data.variant != "vertical" and data.height >= 1250:
            measures.append(measure_rh_MV_a, measure_rh_MV_b)
        elif data.variant != "vertical":
            measures.append(measure_rh_no_MV)
        
        rows = [
            ['nummer1', 'nummer2', 'nummer3', 'nummer4'],
            ['nummer5', 'nummer6', 'nummer7', 'nummer8'],
            ['nummer9', 'nummer10', 'nummer11', 'nummer12'],
            ['nummer13', 'nummer14', 'nummer15', 'nummer16'],
        ]
        
        # render html file to python string
        render = render_template('test.html', measurements=measures)
        
        # define html to be converted to pdf
        html = HTML(string=render)
        
        # define path to css file for pdf styling
        css = CSS(filename='/app/app/templates/style.css')

        # generate pdf from html with css
        pdf = html.write_pdf(stylesheets=[css])

        # build the http response to request
        response = make_response(pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'inline;filename=output.pdf'
        
        return response