FROM node:12.10.0-alpine

WORKDIR /test/server

COPY package*.json ./
RUN npm ci -qy
RUN npm install --production=false

COPY . .

EXPOSE 3000

CMD ["npm", "start"]