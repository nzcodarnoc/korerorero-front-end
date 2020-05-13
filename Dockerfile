FROM node:13

EXPOSE 3000

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build
CMD [ "yarn", "start" ]
