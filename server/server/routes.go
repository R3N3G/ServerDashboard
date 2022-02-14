package server

import (
	"code.unjx.de/systemo/helpers"
	"code.unjx.de/systemo/system"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"net/http"
	"runtime"
)

func (wp *Webpage) defineRoutes() {
	wp.Router.Route("/system", func(r chi.Router) {
		r.Get("/ws/", wp.routeWebSocketSystem)
		r.Get("/live/", wp.routeLiveStruct)
		r.Get("/static/", wp.routeStaticStruct)
	})
}

func (wp *Webpage) routeWebSocketSystem(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(r *http.Request) bool { return true },
	}
	r.Header.Set("Access-Control-Allow-Origin", "*")
	conn, _ := upgrader.Upgrade(w, r, nil)
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

func (wp *Webpage) routeLiveStruct(w http.ResponseWriter, r *http.Request) {
	ramPercentage, ramValue := system.LiveRam()
	diskPercentage, diskValue := system.LiveDisk()
	var result = system.Live{
		Values: struct {
			RAM  string `json:"ram"`
			Disk string `json:"disk"`
		}{
			RAM:  ramValue,
			Disk: diskValue,
		},
		Percentage: struct {
			CPU  float64 `json:"cpu"`
			RAM  float64 `json:"ram"`
			Disk float64 `json:"disk"`
		}{
			CPU:  system.LiveCpu(),
			RAM:  ramPercentage,
			Disk: diskPercentage,
		},
	}
	helpers.JsonResponse(w, result, http.StatusOK)
}

func (wp *Webpage) routeStaticStruct(w http.ResponseWriter, r *http.Request) {
	var result = system.Static{
		Values: struct {
			CPU  string `json:"cpu"`
			RAM  string `json:"ram"`
			Disk string `json:"disk"`
		}{
			CPU:  system.StaticCpu(),
			RAM:  system.StaticRam(),
			Disk: system.StaticDisk(),
		},
		Extras: struct {
			OperatingSystem       string `json:"operating_system"`
			ProcessorArchitecture string `json:"processor_architecture"`
			GoVersion             string `json:"go_version"`
		}{
			OperatingSystem:       system.GetSystemOs(),
			ProcessorArchitecture: runtime.GOARCH,
			GoVersion:             runtime.Version(),
		},
	}
	helpers.JsonResponse(w, result, http.StatusOK)
}
