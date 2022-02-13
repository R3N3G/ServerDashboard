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
		AllowedOrigins: []string{"http://localhost"},
	}))
	wp.Router.Use(middleware.Logger)
	wp.Router.Use(middleware.Recoverer)
}

func (wp *Webpage) initRouter() {
	wp.Router = chi.NewRouter()
}

func (wp Webpage) serve(address string) {
	http.ListenAndServe(address, wp.Router)
}

func Run(address string) {
	wp := Webpage{}
	wp.Upgrader = websocket.Upgrader{}
	wp.initRouter()
	wp.initMiddleWare()
	wp.defineRoutes()
	wp.serve(address)
}
