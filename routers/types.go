package routers

import (
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
)

type Webpage struct {
	Router          *chi.Mux
	Websocket       *websocket.Conn
	Upgrader        websocket.Upgrader
	HtmlInformation struct {
		Title string
	}
}
