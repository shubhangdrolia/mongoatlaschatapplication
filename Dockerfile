FROM node:latest

WORKDIR /usr/src/app


COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
COPY . .

EXPOSE 7000
CMD ["node", "server"]
