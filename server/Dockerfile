FROM node:20-alpine
WORKDIR /src/index
COPY . /src/index
ENV SERVER_PORT=$SERVER_PORT
EXPOSE $SERVER_PORT
RUN npm install
CMD npm start