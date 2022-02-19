package server

import (
	"code.unjx.de/systemo/system"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
)

type Webpage struct {
	Router       *gin.Engine
	Websocket    *websocket.Conn
	WsUpgrade    websocket.Upgrader
	SiteUrl      string
	StaticSystem system.StaticInformation
}

func (wp *Webpage) setMiddlewares() {
	wp.Router.Use(gin.Recovery())
	wp.Router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
	}))
	wp.Router.SetTrustedProxies(nil)
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

func (wp *Webpage) initStaticInformation() {
	wp.StaticSystem = system.StaticInformation{
		Processor: system.GetCpuInfo(),
		Host:      system.GetHostInfo(),
		Memory:    system.GetMemoryInfo(),
		Disk:      system.GetDiskInfo(),
	}
}

func SetupServer() *gin.Engine {
	wp := Webpage{
		Router: gin.New(),
		WsUpgrade: websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin:     func(r *http.Request) bool { return true },
		},
	}
	wp.setMiddlewares()
	wp.Router.LoadHTMLGlob("templates/*")
	wp.serveStatic([]string{
		"static",
		"favicon",
	})
	wp.initStaticInformation()
	wp.defineRoutes()
	return wp.Router
}
