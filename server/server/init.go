package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"net/http"
)

func (wp *Webpage) initMiddleWare() {
	wp.Router.Use(middleware.Recoverer)
}

func (wp *Webpage) initRouter() {
	wp.Router = chi.NewRouter()
}

func SetupServer() *chi.Mux {
	wp := Webpage{}
	wp.initRouter()
	wp.initMiddleWare()
	wp.defineRoutes()
	serveStatic(wp.Router, "static")
	return wp.Router
}

func Run(address string, router *chi.Mux) {
	http.ListenAndServe(address, router)
}
