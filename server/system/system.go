package system

import (
	"encoding/json"
	"fmt"
	"github.com/dariubs/percent"
	"github.com/gorilla/websocket"
	"github.com/jaypipes/ghw/pkg/unitutil"
	. "github.com/klauspost/cpuid/v2"
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

func StaticCpu() (string, int, int) {
	c, err := cpu.Info()
	if err != nil || len(c) <= 0 {
		return "not detected", 0, 0
	}
	return c[0].ModelName, CPU.PhysicalCores, CPU.LogicalCores
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

func StaticRam() (string, float64, float64) {
	r, err := mem.VirtualMemory()
	if err != nil {
		return "", 0, 1
	}
	var niceTotal float64 = 0
	total := r.Total
	if total <= 0 {
		return "", 0, 1
	}
	unit, unitStr := unitutil.AmountString(int64(total))
	fTotal := float64(unit)
	niceTotal = float64(total) / fTotal
	return fmt.Sprintf("%.2f %s", niceTotal, unitStr), niceTotal, fTotal
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
		niceUsage = float64(used) / staticSystem.RamUnit
		result.Value = fmt.Sprintf("%.2f / %s", niceUsage, staticSystem.TotalRamString)
		result.Percentage = math.RoundToEven(percent.PercentOfFloat(niceUsage, staticSystem.TotalRamNumber))
	}
	return result
}

func StaticDisk() (string, float64, float64) {
	d, err := disk.Usage("/")
	if err != nil {
		return "", 0, 1
	}
	total := d.Total
	if d.Total <= 0 {
		return "", 0, 1
	}
	unit, unitStr := unitutil.AmountString(int64(total))
	fTotal := float64(unit)
	niceTotal := float64(total) / fTotal
	return fmt.Sprintf("%.2f %s", niceTotal, unitStr), niceTotal, fTotal
}

func LiveDisk(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
	d, err := disk.Usage("/")
	if err != nil {
		return result
	}
	usage := d.Used
	if usage > 0 {
		niceUsage := float64(usage) / staticSystem.DiskUnit
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
