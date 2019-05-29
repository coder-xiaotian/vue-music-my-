FROM node:12.3.1

RUN apt-get update \
    && apt-get install -y nginx

WORKDIR /app

COPY . /app/

EXPOSE 80

RUN npm install \
    && npm run build \
    && cp ./dist/* /var/www/html \
    && rm -rf /app

CMD ["nginx", "-g", "daemon off"]
