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

func StaticCpu() (string, int32) {
	result, err := cpu.Info()
	if err != nil || result[0].ModelName == "" {
		return "none detected", 1
	}
	return fmt.Sprintf("%s", result[0].ModelName), result[0].Cores
}

func StaticRam() string {
	result, err := mem.VirtualMemory()
	if err != nil {
		return "0 Megabyte"
	}
	return fmt.Sprintf("%.2f GB", float64(result.Total)/1000000000)
}

func StaticDisk() string {
	result, err := disk.Usage("/")
	if err != nil {
		return "0 Gigabyte"
	}
	return fmt.Sprintf("%.0f GB", float64(result.Total)/1000000000)
}

func LiveCpu(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
	percent, err := cpu.Percent(0, false)
	if err != nil {
		return result
	}
	result.Value = staticSystem.Processor
	result.Percentage = math.RoundToEven(percent[0])
	return result
}

func LiveRam(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
	r, err := mem.VirtualMemory()
	if err != nil {
		return result
	}
	result.Value = fmt.Sprintf("%.1f / %s", float64(r.Used)/1000000000, staticSystem.AvailableRam)
	result.Percentage = math.RoundToEven(r.UsedPercent)
	return result
}

func LiveDisk(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
	d, err := disk.Usage("/")
	if err != nil {
		return result
	}
	result.Value = fmt.Sprintf("%.0f / %s", float64(d.Used)/1000000000, staticSystem.AvailableDisk)
	result.Percentage = math.RoundToEven(d.UsedPercent)
	return result
}

func GetLiveSystem(conn *websocket.Conn, staticSystem *StaticInformation) {
	var result LiveInformation
	for {
		result.CPU = LiveCpu(staticSystem)
		result.RAM = LiveRam(staticSystem)
		result.Disk = LiveDisk(staticSystem)

		send, _ := json.Marshal(result)
		err := conn.WriteMessage(websocket.TextMessage, send)
		if err != nil {
			return
		}
		time.Sleep(time.Second * 1)
	}
}
