FROM node:17-alpine AS client
ARG PROXY_URL
ENV PROXY_URL $PROXY_URL
WORKDIR /client
COPY ./client .
RUN npm install --silent
RUN npm run build

FROM golang:alpine AS server
ARG PROXY_URL
ENV PROXY_URL $PROXY_URL
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
