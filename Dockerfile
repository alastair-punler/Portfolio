FROM nginx:alpine

ENV PORT=8080

COPY nginx.default.conf.template /etc/nginx/templates/default.conf.template
COPY site /usr/share/nginx/html
COPY site/.htpasswd /etc/nginx/.htpasswd
