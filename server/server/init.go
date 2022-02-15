package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/gorilla/websocket"
	"net/http"
	"strings"
)

var clientUrl = "https://sys.tp.unjx.de/"

func (wp *Webpage) initMiddleWare() {
	wp.Router.Use(cors.Handler(cors.Options{
		AllowedOrigins: strings.Split(wp.AllowOrigin, ","),
	}))
	wp.Router.Use(middleware.Recoverer)
}

func (wp *Webpage) initRouter() {
	wp.Upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(r *http.Request) bool { return true },
	}
	wp.Router = chi.NewRouter()
}

func SetupServer(allowedOrigin string) *chi.Mux {
	wp := Webpage{}
	wp.AllowOrigin = allowedOrigin
	wp.initRouter()
	wp.initMiddleWare()
	wp.defineRoutes()
	serveStatic(wp.Router, "static")
	return wp.Router
}

func Run(address string, router *chi.Mux) {
	http.ListenAndServe(address, router)
}
