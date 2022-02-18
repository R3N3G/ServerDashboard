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
	ProcessorArchitecture string `json:"processor_architecture"`
	CoreCount             int32  `json:"core_count"`
	OperatingSystem       string `json:"operating_system"`
	AvailableRam          string `json:"available_ram"`
	AvailableDisk         string `json:"available_disk"`
}
