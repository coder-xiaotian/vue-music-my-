FROM node:12.3.1

# RUN apt-get update \
#    && apt-get install -y nginx

WORKDIR /app

COPY . /app/

EXPOSE 80

# 第三步是将favicon.ico放到dist/static中,否则会找不到
RUN npm install \
    && npm run build \
    && mv ./dist/favicon.ico ./dist/static \
    # && cp -r ./dist/* /var/www/html \
    && npm install pm2@latest -g \
    && npm install express -g \
    && rm -rf `ls | grep -v prod.server.js`

# CMD ["nginx", "-g", "daemon off;"]
CMD pm2 start prod.server.js
