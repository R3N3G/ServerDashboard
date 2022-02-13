package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/gorilla/websocket"
	"net/http"
)

func (wp *Webpage) initMiddleWare() {
	wp.Router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"*"},
	}))
	wp.Router.Use(middleware.Logger)
	wp.Router.Use(middleware.Recoverer)
}

func (wp *Webpage) initRouter() {
	wp.Router = chi.NewRouter()
}

func SetupServer() *chi.Mux {
	wp := Webpage{}
	wp.Upgrader = websocket.Upgrader{}
	wp.initRouter()
	wp.initMiddleWare()
	wp.defineRoutes()
	return wp.Router
}

func Run(address string, router *chi.Mux) {
	http.ListenAndServe(address, router)
}
