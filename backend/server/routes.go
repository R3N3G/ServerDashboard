package server

import (
	"code.unjx.de/systemo/system"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (wp *Webpage) defineRoutes() {
	wp.Router.GET("/", wp.routeHome)
	routeSystem := wp.Router.Group("/system")
	{
		routeSystem.GET("/static", wp.routeStaticSystem)
		routeSystem.GET("/ws", wp.routeLiveSystem)
	}
	wp.Router.NoRoute(wp.noRoute)
}

func (wp *Webpage) routeHome(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func (wp *Webpage) noRoute(c *gin.Context) {
	c.Redirect(http.StatusTemporaryRedirect, "/")
}

func (wp *Webpage) routeStaticSystem(c *gin.Context) {
	c.JSON(200, wp.StaticSystem)
}

func (wp *Webpage) routeLiveSystem(c *gin.Context) {
	conn, _ := wp.WsUpgrade.Upgrade(c.Writer, c.Request, nil)
	c.Request.Header.Set("Access-Control-Allow-Origin", "*")
	defer conn.Close()
	go system.GetLiveSystem(conn, &wp.StaticSystem)
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			break
		}
		fmt.Println(message)
	}
}
