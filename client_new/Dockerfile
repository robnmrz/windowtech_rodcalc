FROM node:14-alpine AS build

LABEL maintainer="r.merz@geze.com"

COPY ./package.json /package.json

RUN mkdir app

RUN apk update
RUN npm install

COPY . /app
WORKDIR /app

RUN npm run build

FROM nginx:alpine AS prod-stage

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5050

CMD ["/bin/sh", "-c", "sed -i 's/listen  .*/listen 5050;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]