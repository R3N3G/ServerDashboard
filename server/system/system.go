package system

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
	"math"
	"time"
)

func GetSystemOs() string {
	sysInfo, err := host.Info()
	if err != nil {
		return ""
	}
	switch sysInfo.OS {
	case "darwin":
		return "Apple MacOS"
	case "linux":
		return "Linux"
	case "windows":
		return "Microsoft Windows"
	default:
		return ""
	}
}

func StaticCpu() string {
	result, err := cpu.Info()
	if err != nil || result[0].ModelName == "" {
		return "none detected"
	}
	return fmt.Sprintf("%s", result[0].ModelName)
}

func StaticRam() string {
	result, err := mem.VirtualMemory()
	if err != nil {
		return "0 Megabyte"
	}
	return fmt.Sprintf("%.0f Megabyte", float64(result.Total)/1000000)
}

func StaticDisk() string {
	result, err := disk.Usage("/")
	if err != nil {
		return "0 Gigabyte"
	}
	return fmt.Sprintf("%.0f Gigabyte", float64(result.Total)/1000000000)
}

func LiveCpu() float64 {
	resultPercent, err := cpu.Percent(0, false)
	if err != nil {
		return 0
	}
	return math.RoundToEven(resultPercent[0])
}

func LiveRam() (float64, string) {
	result, err := mem.VirtualMemory()
	if err != nil {
		return 0, "0"
	}
	return math.RoundToEven(result.UsedPercent), fmt.Sprintf("%.0f", float64(result.Used)/1000000)
}

func LiveDisk() (float64, string) {
	result, err := disk.Usage("/")
	if err != nil {
		return 0, "0"
	}
	return math.RoundToEven(result.UsedPercent), fmt.Sprintf("%.0f", float64(result.Used)/1000000000)
}

func GetLiveSystem(conn *websocket.Conn) {
	var result Live
	for {
		result.Percentage.CPU = LiveCpu()
		result.Percentage.RAM, result.Values.RAM = LiveRam()
		result.Percentage.Disk, result.Values.Disk = LiveDisk()

		send, _ := json.Marshal(result)
		err := conn.WriteMessage(websocket.TextMessage, send)
		if err != nil {
			return
		}
		time.Sleep(time.Second * 1)
	}
}
