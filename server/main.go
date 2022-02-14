package main

import (
	"code.unjx.de/systemo/server"
)

func main() {
	router := server.SetupServer()
	server.Run(":4000", router)
}
