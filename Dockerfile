FROM node:current-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 5001
CMD ["node", "index.js"]

