FROM keymetrics/pm2:latest-alpine

MAINTAINER xiaotian

WORKDIR /app

COPY . /app/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install \
    && npm run build

# Install bash
RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories
RUN apk update \
    && apk upgrade \
    && apk add --no-cache bash \
    bash-doc \
    bash-completion \
    && rm -rf /var/cache/apk/* \
    && /bin/bash

# Show current folder structure in logs
#RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]
