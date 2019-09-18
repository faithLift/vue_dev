FROM mhart/alpine-node:latest

MAINTAINER blowhunter "blowhunter2009@gmail.com"

RUN apk add --no-cache git python make
RUN npm install vue vue-cli cross-env -g

EXPOSE 8080

RUN mkdir /vue
WORKDIR /vue
