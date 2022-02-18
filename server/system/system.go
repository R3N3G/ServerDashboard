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

func StaticRam() string {
	m, err := ghw.Memory()
	if err != nil || m.TotalPhysicalBytes <= 0 {
		return ""
	}
	tpb := m.TotalPhysicalBytes
	unit, unitStr := unitutil.AmountString(tpb)
	return fmt.Sprintf("%.2f%s", float64(tpb)/float64(unit), unitStr)
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
	tpb := r.Used
	unit, _ := unitutil.AmountString(int64(tpb))
	result.Value = fmt.Sprintf("%.2f / %s", float64(tpb)/float64(unit), staticSystem.AvailableRam)
	result.Percentage = math.RoundToEven(r.UsedPercent)
	return result
}

func LiveDisk() BasicInformation {
	var result BasicInformation
	partitions, err := disk.Partitions(false)
	if err != nil {
		return result
	}
	var usage uint64 = 0
	var total uint64 = 0
	var niceUsage float64 = 0
	var niceTotal float64 = 0
	for _, partition := range partitions {
		d, err := disk.Usage(partition.Mountpoint)
		if err == nil {
			usage += d.Used
			total += d.Total
		}
	}
	if usage > 0 {
		unit, _ := unitutil.AmountString(int64(usage))
		niceUsage = float64(usage) / float64(unit)
		result.Value = fmt.Sprintf("%.2f", niceUsage)
	}
	if total > 0 {
		unit, unitStr := unitutil.AmountString(int64(total))
		niceTotal = float64(total) / float64(unit)
		result.Value += fmt.Sprintf("/ %.2f %s", niceTotal, unitStr)
		result.Percentage = math.RoundToEven(percent.PercentOfFloat(niceUsage, niceTotal))
	}
	return result
}

func GetLiveSystem(conn *websocket.Conn, staticSystem *StaticInformation) {
	var result LiveInformation
	for {
		result.CPU = LiveCpu(staticSystem)
		result.RAM = LiveRam(staticSystem)
		result.Disk = LiveDisk()

		send, _ := json.Marshal(result)
		err := conn.WriteMessage(websocket.TextMessage, send)
		if err != nil {
			return
		}
		time.Sleep(time.Second * 1)
	}
}
