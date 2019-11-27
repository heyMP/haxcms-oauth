FROM node:12

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile --no-cache

RUN chown -R node:node node_modules
RUN chown -R node:node /tmp
COPY --chown=node:node . .

USER node

CMD [ "yarn", "start" ]