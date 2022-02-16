FROM node:17-alpine AS client
WORKDIR /client
COPY ./client .
RUN npm install --silent
RUN npm run build

FROM golang:alpine AS server
WORKDIR /server
COPY ./server .
RUN go mod download
RUN go mod verify
RUN go build -o app

FROM alpine AS final
WORKDIR /app
COPY --from=server /server/app .
COPY --from=client /client/build/index.html ./templates/index.html
COPY --from=client /client/build/static/ ./static/
COPY --from=client /client/build/favicon/ ./favicon/
CMD ["./app"]
