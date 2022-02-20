package system

import (
	"encoding/json"
	"fmt"
	"github.com/dariubs/percent"
	"github.com/gorilla/websocket"
	"github.com/jaypipes/ghw/pkg/unitutil"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/mem"
	"math"
	"os"
	"runtime"
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
		return "none detected"
	}
}

func GetHostInfo() Host {
	var h Host
	h.OperatingSystem = ConvertOs(runtime.GOOS)
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

func LiveCpu(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
	p, err := cpu.Percent(0, false)
	if err != nil {
		return result
	}
	result.Value = staticSystem.Processor.Name
	result.Percentage = math.RoundToEven(p[0])
	return result
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
		niceUsage = float64(used) / staticSystem.Memory.Unit
		result.Value = fmt.Sprintf("%.0f %s", niceUsage, staticSystem.Memory.UnitString)
		result.Percentage = math.RoundToEven(percent.PercentOfFloat(niceUsage, staticSystem.Memory.Value))
	}
	return result
}

func LiveDisk(staticSystem *StaticInformation) BasicInformation {
	var result BasicInformation
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
