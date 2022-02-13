package main

import (
	"code.unjx.de/systemo/server"
)

func main() {
	router := server.SetupServer()
	server.Run(":8700", router)
}
