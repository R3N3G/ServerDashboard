FROM node:17-alpine AS client
WORKDIR /client
COPY ./client .
RUN npm install
RUN npm run build

FROM golang:alpine AS server
WORKDIR /server
COPY ./server .
RUN go mod download
RUN go mod verify
RUN go build -o app

FROM nginx:alpine AS final
WORKDIR /
COPY --from=server /server/app .
COPY --from=client /client/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./start.sh .
