package system

import (
	"encoding/json"
	"fmt"
	"github.com/dariubs/percent"
	"github.com/gorilla/websocket"
	"github.com/jaypipes/ghw/pkg/unitutil"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
	"math"
	"os"
	"runtime"
	"strings"
	"time"
)

func ConvertOs(os string) string {
	switch os {
	case "darwin":
		return "MacOS"
	default:
		return strings.Title(os)
	}
}

func GetHostInfo() Host {
	var h Host
	i, err := host.Info()
	if err != nil {
		return h
	}
	h.OperatingSystem = ConvertOs(i.OS)
	h.Platform = ConvertOs(i.Platform)
	h.PlatformVersion = i.PlatformVersion
	h.Processes = i.Procs
	d, err := disk.Partitions(false)
	if err != nil {
		return h
	}
	h.Partitions = len(d)
	hostname, present := os.LookupEnv("SERVER_NAME")
	if present == false {
		return h
	}
	h.ServerName = hostname
	return h
}

func GetCpuInfo() Processor {
	var p Processor
	p.Threads = runtime.NumCPU()
	p.Architecture = runtime.GOARCH
	c, err := cpu.Info()
	if err == nil {
		p.Name = c[0].ModelName
		p.Speed = fmt.Sprintf("%.1f Ghz", c[0].Mhz/1000)
	} else {
		p.Name = "none detected"
	}
	return p
}

func processStorage(s *Storage, total uint64) {
	unit, unitStr := unitutil.AmountString(int64(total))
	s.Unit = float64(unit)
	s.Value = float64(total) / s.Unit
	s.UnitString = unitStr
	s.Readable = fmt.Sprintf("%.0f %s", s.Value, s.UnitString)
}

func GetDiskInfo() Storage {
	var s Storage
	d, err := disk.Usage("/")
	if err != nil {
		return s
	}
	total := d.Total
	if total <= 0 {
		return s
	}
	processStorage(&s, total)
	return s
}

func GetMemoryInfo() Storage {
	var s Storage
	r, err := mem.VirtualMemory()
	if err != nil {
		return s
	}
	total := r.Total
	if total <= 0 {
		return s
	}
	processStorage(&s, total)
	return s
}

func LiveCpu(staticSystem *StaticInformation) BasicSystemInformation {
	var result BasicSystemInformation
	p, err := cpu.Percent(0, false)
	if err != nil {
		return result
	}
	result.Value = staticSystem.Processor.Name
	result.Percentage = math.RoundToEven(p[0])
	return result
}

func LiveRam(staticSystem *StaticInformation) BasicSystemInformation {
	var result BasicSystemInformation
	r, err := mem.VirtualMemory()
	if err != nil {
		return result
	}
	var niceUsage float64 = 0
	used := r.Used
	if used > 0 {
		niceUsage = float64(used) / staticSystem.Memory.Unit
		result.Value = fmt.Sprintf("%.0f %s", niceUsage, staticSystem.Memory.UnitString)
		result.Percentage = math.RoundToEven(percent.PercentOfFloat(niceUsage, staticSystem.Memory.Value))
	}
	return result
}

func LiveDisk(staticSystem *StaticInformation) BasicSystemInformation {
	var result BasicSystemInformation
	d, err := disk.Usage("/")
	if err != nil {
		return result
	}
	usage := d.Used
	if usage > 0 {
		niceUsage := float64(usage) / staticSystem.Disk.Unit
		result.Value = fmt.Sprintf("%.0f %s", niceUsage, staticSystem.Disk.UnitString)
		result.Percentage = math.RoundToEven(percent.PercentOfFloat(niceUsage, staticSystem.Disk.Value))
	}
	return result
}

func formatTime(uptime uint64) string {
	// t in Microseconds
	const (
		day    = 60 * 60 * 24
		second = 60 * 60
		hour   = 60
	)
	days := uptime / day
	hours := (uptime - (days * day)) / second
	minutes := ((uptime - (days * day)) - (hours * second)) / hour
	return fmt.Sprintf("%d days, %d hours, %d minutes", days, hours, minutes)
}

func LiveHost() BasicHostInformation {
	var result BasicHostInformation
	i, err := host.Info()
	if err != nil {
		return result
	}
	result.Uptime = formatTime(i.Uptime)
	return result
}

func GetLiveSystem(conn *websocket.Conn, staticSystem *StaticInformation) {
	var result LiveInformation
	for {
		result.CPU = LiveCpu(staticSystem)
		result.RAM = LiveRam(staticSystem)
		result.Disk = LiveDisk(staticSystem)
		result.Host = LiveHost()

		send, _ := json.Marshal(result)
		err := conn.WriteMessage(websocket.TextMessage, send)
		if err != nil {
			return
		}
		time.Sleep(time.Second * 1)
	}
}
