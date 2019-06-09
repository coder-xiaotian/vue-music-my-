FROM keymetrics/pm2:latest-alpine

WORKDIR app
# Bundle APP files
COPY * src/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production \
    && ls -a

CMD [ "pm2-runtime", "start", "pm2.json" ]
