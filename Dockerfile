FROM node:12.3.1

RUN apt-get update \
    && apt-get install -y nginx

WORKDIR /app

COPY . /app/

EXPOSE 80

RUN npm install \
    && npm run build \
    && mv ./dist/favicon.ico ./dist/static \ # 将favicon.ico放到dist/static中，否则会找不到
    && cp -r ./dist/* /var/www/html \
    && rm -rf /app

CMD ["nginx", "-g", "daemon off;"]
