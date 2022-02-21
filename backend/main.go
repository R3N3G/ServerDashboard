package main

import (
	"code.unjx.de/systemo/server"
)

func main() {
	router := server.SetupServer()
	router.Run(":4000")
}
