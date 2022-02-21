FROM node:17-alpine AS client
WORKDIR /frontend
COPY frontend .
RUN npm install
RUN npm run build

FROM golang:alpine AS server
WORKDIR /backend
COPY backend .
RUN go mod download
RUN go mod verify
RUN go build -o app

FROM alpine AS final
WORKDIR /app
COPY --from=server /backend/app .
COPY --from=client /frontend/build/index.html ./templates/index.html
COPY --from=client /frontend/build/static/ ./static/
COPY --from=client /frontend/build/favicon/ ./favicon/
CMD ["./app"]
