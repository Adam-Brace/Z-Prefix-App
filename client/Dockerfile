
FROM node:20-alpine
WORKDIR /src/app
COPY . /src/app
ENV CLIENT_PORT=$CLIENT_PORT
EXPOSE $CLIENT_PORT
RUN npm install
CMD npm run dev