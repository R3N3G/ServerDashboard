FROM node:17-alpine AS client
ARG REACT_APP_SITE_URL
ENV REACT_APP_SITE_URL $REACT_APP_SITE_URL
WORKDIR /client
ENV PATH ./node_modules/.bin:$PATH
COPY ./client .
RUN npm install --silent
RUN sass ./src/customStyle.scss [./css/customStyle.css]
RUN npm run build

FROM golang:alpine AS server
WORKDIR /server
COPY ./server .
RUN go mod download
RUN go mod verify
RUN go build -o app

FROM alpine AS final
ARG REACT_APP_SITE_URL
ENV REACT_APP_SITE_URL $REACT_APP_SITE_URL
WORKDIR /app
COPY --from=server /server/app .
COPY --from=client /client/build/index.html ./templates/index.html
COPY --from=client /client/build/static/ ./static/
COPY --from=client /client/build/favicon/ ./favicon/
CMD ["./app"]
