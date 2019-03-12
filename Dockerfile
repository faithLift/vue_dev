FROM mhart/alpine-node:latest

MAINTAINER wangshuangyi046 "ex_wljr_wangshuangyi@pingan.com.cn"

RUN apk add --no-cache git
RUN npm install vue vue-cli cross-env -g

EXPOSE 8080

RUN mkdir /vue
WORKDIR /vue
