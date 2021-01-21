FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 5050

CMD ["/bin/sh", "-c", "sed -i 's/listen  .*/listen 5050;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]