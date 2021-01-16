
import os
from functools import wraps
from flask import request, make_response

# decorator function for api-key authentication
def require_api_key_auth(endpoint_func):
    @wraps(endpoint_func)
    
    def check_api_key(*args, **kwargs):
        if request.headers.get(os.environ.get('HEADER_NAME')) == os.environ.get('SECRET_KEY'):
            return endpoint_func(*args, **kwargs)
        else:
            return make_response('Request not verified', 401)
    return check_api_key