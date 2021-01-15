# from reportlab.platypus import SimpleDocTemplate, Table
# from reportlab.lib.pagesizes import letter

# # creating table with list from list
# test_data = [
#     ['header1', 'header2', 'header3', 'header4'],
#     ['testrow11', 'testrow12', 'testrow13', 'testrow14'],
#     ['testrow21', 'testrow22', 'testrow23', 'testrow24'],
#     ['testrow31', 'testrow32', 'testrow33', 'testrow34'],
# ]

# filename = 'pdfTable.pdf'

# pdf = SimpleDocTemplate(
#     filename,
#     pagesize=letter
# )

# table = Table(test_data)

# elements = []
# elements.append(table)

# x = pdf.build(elements)