package system

type Live struct {
	Values struct {
		RAM  string `json:"ram"`
		Disk string `json:"disk"`
	} `json:"values"`
	Percentage struct {
		CPU  float64 `json:"cpu"`
		RAM  float64 `json:"ram"`
		Disk float64 `json:"disk"`
	} `json:"percentage"`
}

type Values struct {
	CPU  string `json:"cpu"`
	RAM  string `json:"ram"`
	Disk string `json:"disk"`
}

type Extras struct {
	OperatingSystem       string `json:"operating_system"`
	ProcessorArchitecture string `json:"processor_architecture"`
	CoreCount             int32  `json:"core_count"`
}

type Static struct {
	Values `json:"values"`
	Extras `json:"extras"`
}
