FROM node:14.18.0-alpine
WORKDIR /EventHub-Backend

COPY package.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install

CMD ["npm", "run", "start"]
