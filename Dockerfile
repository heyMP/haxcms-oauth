FROM node:12

WORKDIR /home/node/app

COPY package.json package.json
RUN yarn install
COPY . .

USER node

ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD [ "yarn", "start" ]