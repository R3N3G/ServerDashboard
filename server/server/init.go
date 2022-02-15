package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"os"
)

type Webpage struct {
	Router    *gin.Engine
	Websocket *websocket.Conn
	WsUpgrade websocket.Upgrader
	SiteUrl   string
}

func (wp *Webpage) setEnvironmentVariables() {
	siteUrl, ok := os.LookupEnv("REACT_APP_SITE_URL")
	if !ok {
		siteUrl = "http://localhost:3000"
	}
	wp.SiteUrl = siteUrl
}

func (wp *Webpage) setMiddlewares() {
	wp.Router.Use(gin.Recovery())
	wp.Router.Use(cors.New(cors.Config{
		AllowOrigins: []string{wp.SiteUrl},
	}))
	wp.Router.SetTrustedProxies([]string{wp.SiteUrl})
}

func (wp *Webpage) serveStatic(staticFolders []string) {
	for _, folder := range staticFolders {
		wp.Router.Use(
			static.Serve("/"+folder,
				static.LocalFile("./"+folder, false),
			),
		)
	}
}

func SetupServer() *gin.Engine {
	wp := Webpage{
		Router:    gin.New(),
		WsUpgrade: websocket.Upgrader{},
	}
	wp.setEnvironmentVariables()
	wp.setMiddlewares()
	wp.Router.LoadHTMLGlob("templates/*")
	wp.serveStatic([]string{
		"static",
		"favicon",
	})
	wp.defineRoutes()
	return wp.Router
}
