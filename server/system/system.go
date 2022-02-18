package system

import (
	"encoding/json"
	"fmt"
	"github.com/dariubs/percent"
	"github.com/gorilla/websocket"
	"github.com/jaypipes/ghw"
	"github.com/jaypipes/ghw/pkg/unitutil"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
	"math"
	"time"
)

func ConvertOs(os string) string {
	switch os {
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

func GetHostInfo() (string, string) {
	h, err := host.Info()
	if err != nil {
		return "", ""
	}
	return ConvertOs(h.OS), h.Hostname
}

func StaticCpu() (string, uint32, uint32) {
	c, err := ghw.CPU()
	if err != nil {
		return "", 0, 0
	}
	return c.Processors[0].Model, c.TotalCores, c.TotalThreads
}

func LiveCpu(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
	p, err := cpu.Percent(0, false)
	if err != nil {
		return result
	}
	result.Value = staticSystem.Processor
	result.Percentage = math.RoundToEven(p[0])
	return result
}

func StaticRam() (string, float64) {
	r, err := mem.VirtualMemory()
	if err != nil {
		return "", 0
	}
	var niceTotal float64 = 0
	total := r.Total
	if total <= 0 {
		return "", 0
	}
	unit, unitStr := unitutil.AmountString(int64(total))
	niceTotal = float64(total) / float64(unit)
	return fmt.Sprintf("%.2f %s", niceTotal, unitStr), niceTotal
}

func LiveRam(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
	r, err := mem.VirtualMemory()
	if err != nil {
		return result
	}
	var niceUsage float64 = 0
	used := r.Used
	if used > 0 {
		unit, _ := unitutil.AmountString(int64(used))
		niceUsage = float64(used) / float64(unit)
		result.Value = fmt.Sprintf("%.2f / %s", niceUsage, staticSystem.TotalRamString)
		result.Percentage = math.RoundToEven(percent.PercentOfFloat(niceUsage, staticSystem.TotalRamNumber))
	}
	return result
}

func StaticDisk() (string, float64) {
	partitions, err := disk.Partitions(false)
	if err != nil {
		return "", 0
	}
	var total uint64 = 0
	var niceTotal float64 = 0
	for _, partition := range partitions {
		d, err := disk.Usage(partition.Mountpoint)
		if err == nil {
			total += d.Total
		}
	}
	if total <= 0 {
		return "", 0
	}
	unit, unitStr := unitutil.AmountString(int64(total))
	niceTotal = float64(total) / float64(unit)
	return fmt.Sprintf("%.2f %s", niceTotal, unitStr), niceTotal
}

func LiveDisk(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
	partitions, err := disk.Partitions(false)
	if err != nil {
		return result
	}
	var usage uint64 = 0
	var niceUsage float64 = 0
	for _, partition := range partitions {
		d, err := disk.Usage(partition.Mountpoint)
		if err == nil {
			usage += d.Used
		}
	}
	if usage > 0 {
		unit, _ := unitutil.AmountString(int64(usage))
		niceUsage = float64(usage) / float64(unit)
		result.Value = fmt.Sprintf("%.2f / %s", niceUsage, staticSystem.TotalDiskString)
		result.Percentage = math.RoundToEven(percent.PercentOfFloat(niceUsage, staticSystem.TotalDiskNumber))
	}
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
