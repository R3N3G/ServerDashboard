package system

type BasicSystemInformation struct {
	Value      string  `json:"value"`
	Percentage float64 `json:"percentage"`
}

type BasicHostInformation struct {
	Uptime string `json:"uptime"`
}

type LiveInformation struct {
	CPU  BasicSystemInformation `json:"cpu"`
	RAM  BasicSystemInformation `json:"ram"`
	Disk BasicSystemInformation `json:"disk"`
	Host BasicHostInformation   `json:"host"`
}

type Processor struct {
	Name         string `json:"name"`
	Speed        string `json:"speed"`
	Threads      int    `json:"threads"`
	Architecture string `json:"architecture"`
}

type Host struct {
	ServerName      string `json:"server_name"`
	OperatingSystem string `json:"operating_system"`
	Platform        string `json:"platform"`
	PlatformVersion string `json:"platform_version"`
	Processes       uint64 `json:"processes"`
}

type Storage struct {
	Readable   string  `json:"readable"`
	Value      float64 `json:"value"`
	UnitString string  `json:"unit_string"`
	Unit       float64 `json:"unit"`
}

type StaticInformation struct {
	Processor Processor `json:"processor"`
	Host      Host      `json:"host"`
	Memory    Storage   `json:"ram"`
	Disk      Storage   `json:"disk"`
}
