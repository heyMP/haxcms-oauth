FROM node:12

WORKDIR /home/node/app

COPY package.json ./
RUN yarn install

RUN chown -R node:node node_modules
COPY . .
RUN chown -R node:node *

USER node

CMD [ "yarn", "start" ]