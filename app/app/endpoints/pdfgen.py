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
            "variant": "vertikal",
            "product": "F1200",
            "xshift": null,
            "yshift": null
        }

        # default values
        HOR_F1200_MK = 422
        VER_F1200_MK = 170

        # basic components
        measure_rh_a = (data.width / 2) - 123
        measure_rh_b = data.width - 307
        measure_rv_a = (data.height / 2) - 225
        measure_rv_b = data.height - 409

        # optional component horizontal
        measure_rh_no_MV = HOR_F1200_MK - 175
        # optional component horizontal and MV
        measure_rh_MV_a = HOR_F1200_MK - 225
        measure_rh_MV_a = (data.width / 2) - 74

        rows = [
            ['nummer1', 'nummer2', 'nummer3', 'nummer4'],
            ['nummer5', 'nummer6', 'nummer7', 'nummer8'],
            ['nummer9', 'nummer10', 'nummer11', 'nummer12'],
            ['nummer13', 'nummer14', 'nummer15', 'nummer16'],
        ]
        render = render_template('test.html', rows=rows)
        # font_config = FontConfiguration()
        html = HTML(string=render)
        css = CSS(filename='/app/app/templates/style.css') #, font_config=font_config)

        pdf = html.write_pdf(stylesheets=[css])

        response = make_response(pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'inline;filename=output.pdf'
        
        return response