package main

import (
	"code.unjx.de/systemo/server"
)

func main() {
	router := server.SetupServer()
	server.Run("localhost:8700", router)
}
