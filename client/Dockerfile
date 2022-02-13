# build environment
FROM node:17-alpine as build
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /client/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
