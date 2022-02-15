package main

import (
	"code.unjx.de/systemo/server"
)

func main() {
	// allowed Origins as string comma seperated
	router := server.SetupServer("https://sys.tp.unjx.de/,http://localhost:3000")
	server.Run(":4000", router)
}
