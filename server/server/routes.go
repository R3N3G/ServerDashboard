package server

import (
	"code.unjx.de/systemo/system"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"runtime"
)

func (wp *Webpage) defineRoutes() {
	wp.Router.GET("/", wp.routeHome)
	routeSystem := wp.Router.Group("/system")
	{
		routeSystem.GET("/static/", wp.routeStaticStruct)
		routeSystem.GET("/ws/", wp.routeWebSocketSystem)
	}
	wp.Router.NoRoute(wp.noRoute)
}

func (wp *Webpage) routeHome(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func (wp *Webpage) noRoute(c *gin.Context) {
	c.Redirect(http.StatusTemporaryRedirect, "/")
}

func (wp *Webpage) routeStaticStruct(c *gin.Context) {
	cpuName, coreCount := system.StaticCpu()
	extras := system.Extras{
		OperatingSystem:       system.GetSystemOs(),
		ProcessorArchitecture: runtime.GOARCH,
		GoVersion:             runtime.Version(),
		CoreCount:             coreCount,
	}
	values := system.Values{
		CPU:  cpuName,
		RAM:  system.StaticRam(),
		Disk: system.StaticDisk(),
	}
	var result = system.Static{
		Values: values,
		Extras: extras,
	}
	c.JSON(200, result)
}

func (wp *Webpage) routeWebSocketSystem(c *gin.Context) {
	conn, _ := wp.WsUpgrade.Upgrade(c.Writer, c.Request, nil)
	c.Request.Header.Set("Access-Control-Allow-Origin", "*")
	defer conn.Close()
	go system.GetLiveSystem(conn)
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			break
		}
		fmt.Println(message)
	}
}
