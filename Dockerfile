FROM python:3.8-alpine

# Adding image label for maintainer
LABEL maintainer="r.merz@geze.com"

# Adding /scripts folder to $PATH variable
ENV PATH="/scripts:${PATH}"

# Copying requirements.txt to docker image
COPY ./requirements.txt /requirements.txt

# Updating alpine and installing tmp. packages
RUN apk update
RUN apk add --update --no-cache --virtual .tmp gcc libc-dev musl-dev linux-headers

# Install python dependencies from requirements.txt
RUN pip install -r /requirements.txt

# Setting up working directory
RUN mkdir app
COPY ./app /app
WORKDIR /app

# Create 2 directories with respective subdirectories 
# (-p) for static files on docker image
# RUN mkdir -p /vol/web/media
# RUN mkdir -p /vol/web/static

# Creates new user for docker user (less rights than root user)
RUN adduser -D user
# RUN chown -R user:user /vol

# Grant user full access to static files folders
# RUN chmod -R 755 /vol/web

# Switch user
USER user

# Script to enter application
CMD ['uwsgi', 'app.ini']