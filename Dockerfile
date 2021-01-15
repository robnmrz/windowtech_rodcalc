FROM python:3.8-alpine

# Adding image label for maintainer
LABEL maintainer="r.merz@geze.com"

# Copying requirements.txt to docker image
COPY ./requirements.txt /requirements.txt

# Updating alpine and installing tmp. packages to use pip
RUN apk update
RUN apk add --update --no-cache --virtual .tmp \ 
    gcc libc-dev musl-dev linux-headers

# Adding dependencies for pdf generation
RUN apk add --upgrade --no-cache jpeg-dev zlib-dev \ 
    libffi-dev cairo-dev pango-dev gdk-pixbuf-dev 

# Adding fonts to style pdf output file
RUN apk add --no-cache msttcorefonts-installer \ 
    fontconfig && update-ms-fonts && fc-cache -f

# Install python dependencies from requirements.txt
RUN pip install -r /requirements.txt

# Setting up working directory
RUN mkdir app
COPY ./app /app
WORKDIR /app

# Creates new user for docker user (less rights than root user)
RUN adduser -D user

# Switch to less priviledged user
USER user

# Script to enter application
CMD ["uwsgi", "app.ini"]