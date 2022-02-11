package routers

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"log"
	"net/http"
)

func (wp *Webpage) initMiddleWare() {
	wp.Router.Use(middleware.Logger)
}

func (wp *Webpage) initRouter() {
	wp.Router = chi.NewRouter()
}

func (wp Webpage) serve(address string) {
	log.Fatal(http.ListenAndServe(address, wp.Router))
}
