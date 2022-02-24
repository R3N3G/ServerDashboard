package system

type BasicSystemInformation struct {
	Value      string  `json:"value"`
	Percentage float64 `json:"percentage"`
}

type Uptime struct {
	Days    uint64 `json:"days"`
	Hours   string `json:"hours"`
	Minutes string `json:"minutes"`
	Seconds string `json:"seconds"`
}

type BasicHostInformation struct {
	Uptime Uptime `json:"uptime"`
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
	Partitions      int    `json:"partitions"`
	TotalSwap       string `json:"total_swap"`
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
