FROM node:20-alpine

WORKDIR /workspace

COPY package.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 7000

CMD ["node", "server
.js"]
