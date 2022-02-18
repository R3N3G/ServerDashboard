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
	Processor             string  `json:"processor"`
	TotalCores            uint32  `json:"total_cores"`
	TotalThreads          uint32  `json:"total_threads"`
	ProcessorArchitecture string  `json:"processor_architecture"`
	OperatingSystem       string  `json:"operating_system"`
	TotalDiskString       string  `json:"total_disk_string"`
	TotalDiskNumber       float64 `json:"total_disk_number"`
	TotalRamString        string  `json:"total_ram_string"`
	TotalRamNumber        float64 `json:"total_ram_number"`
	Hostname              string  `json:"hostname"`
}
