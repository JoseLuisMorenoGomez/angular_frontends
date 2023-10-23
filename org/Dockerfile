FROM node:21 as builder
MAINTAINER Manu Barrios<manuel.barrios@mymware.com>

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /usr/src/app

#generate build
RUN npm run build 

FROM nginx:1.25.2-alpine

# copy artifact build from the 'build environment'
COPY --from=builder  /usr/src/app/dist/org /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# expose port 80
# EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]



