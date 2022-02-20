package system

type BasicInformation struct {
	Value      string  `json:"value"`
	Percentage float64 `json:"percentage"`
}

type LiveInformation struct {
	CPU  BasicInformation `json:"cpu"`
	RAM  BasicInformation `json:"ram"`
	Disk BasicInformation `json:"disk"`
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
