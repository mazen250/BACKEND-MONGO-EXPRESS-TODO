FROM node:current-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]


# FROM node:alpine

# RUN mkdir -p /home/node/app &&\
#  chown -R node:node /home/node/app
# WORKDIR /home/node/app

# RUN chgrp -R 0 /home/node/app &&\
#  chmod -R g+rwX /home/node/app

# COPY package*.json /home/node/app/
# USER 1000
# RUN npm install

# COPY --chown=node:node . /home/node/app
# EXPOSE 5000
# CMD ["npm", "start"]