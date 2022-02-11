package routers

import "github.com/gorilla/websocket"

func Run() {
	wp := Webpage{}
	wp.Upgrader = websocket.Upgrader{}
	wp.initRouter()
	wp.defineRoutes()
	wp.serve(":80")
}
