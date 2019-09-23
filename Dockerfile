FROM node:12

WORKDIR /home/node/app

COPY package.json ./
RUN yarn install

COPY prisma ./
RUN yarn run migrate
RUN yarn run generate

RUN chown -R node:node node_modules
COPY . .

USER node

CMD [ "yarn", "start" ]