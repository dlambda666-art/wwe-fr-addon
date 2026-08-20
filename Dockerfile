FROM node:20-alpine

WORKDIR /workspace

COPY package.json ./

RUN npm install --omit=dev
RUN npm install stremio-addon-sdk@1.6.10

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]


