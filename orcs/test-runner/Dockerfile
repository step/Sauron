FROM node:8

WORKDIR /usr/src/app

RUN npm install -g https://github.com/craftybones/mocha-json-reporter.git

RUN npm install -g mocha

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]