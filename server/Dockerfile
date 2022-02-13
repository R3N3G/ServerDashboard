FROM golang
WORKDIR /server
COPY . .
RUN go mod download
RUN go mod verify
RUN go build -o app

CMD ["./app"]
