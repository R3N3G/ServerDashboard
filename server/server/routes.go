package server

import (
	"code.unjx.de/systemo/helpers"
	"code.unjx.de/systemo/system"
	"fmt"
	"github.com/go-chi/chi/v5"
	"html/template"
	"net/http"
	"runtime"
)

func (wp *Webpage) defineRoutes() {
	wp.Router.Get("/", wp.routeHome)
	wp.Router.Route("/system", func(r chi.Router) {
		r.Get("/static/", wp.routeStaticStruct)
		r.Get("/ws/", wp.routeWebSocketSystem)
	})
}

func (wp *Webpage) routeHome(w http.ResponseWriter, r *http.Request) {
	parsedHtml, err := template.ParseFiles("./templates/index.html")
	if err != nil {
		fmt.Println("Cannot parse template:", err)
	}
	err = parsedHtml.Execute(w, nil)
	if err != nil {
		fmt.Println("Cannot execute template:", err)
	}
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

func (wp *Webpage) routeWebSocketSystem(w http.ResponseWriter, r *http.Request) {
	conn, _ := wp.Upgrader.Upgrade(w, r, nil)
	r.Header.Set("Access-Control-Allow-Origin", wp.AllowOrigin)
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
