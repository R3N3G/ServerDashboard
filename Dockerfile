FROM node:17-alpine AS frontend
WORKDIR /frontend
COPY frontend .
RUN npm install
RUN npm run build

FROM golang:alpine AS backend
WORKDIR /backend
COPY backend .
RUN go mod download
RUN go mod verify
RUN go build -o app

FROM alpine AS final
WORKDIR /app
COPY --from=backend /backend/app .
COPY --from=frontend /frontend/build/index.html ./templates/index.html
COPY --from=frontend /frontend/build/static/ ./static/
COPY --from=frontend /frontend/build/favicon/ ./favicon/
CMD ["./app"]
