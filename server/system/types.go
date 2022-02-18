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

type StaticInformation struct {
	Processor             string `json:"processor"`
	TotalCores            uint32 `json:"total_cores"`
	TotalThreads          uint32 `json:"total_threads"`
	ProcessorArchitecture string `json:"processor_architecture"`
	OperatingSystem       string `json:"operating_system"`
	AvailableRam          string `json:"available_ram"`
	Hostname              string `json:"hostname"`
}
