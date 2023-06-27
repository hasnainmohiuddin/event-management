FROM node:14.18.0-alpine as builder
WORKDIR /EventHub-Frontend

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /EventHub-Frontend/build /usr/share/nginx/html
