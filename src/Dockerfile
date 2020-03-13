FROM node:12-slim

EXPOSE 3000
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

COPY . .