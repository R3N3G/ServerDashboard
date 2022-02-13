FROM golang:alpine AS builder
LABEL stage=builder
WORKDIR /server
COPY . .
RUN go mod download
RUN go mod verify
RUN go build -o app

FROM alpine AS final
WORKDIR /
COPY . .
COPY --from=builder /server/app .

CMD ["./app"]
