FROM node:10
WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install
COPY . .

EXPOSE 3001
CMD ["node", "server.js"]
