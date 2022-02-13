package system

type Live struct {
	Values struct {
		RAM  string `json:"ram"`
		Disk string `json:"disk"`
	} `json:"values"`
	Percentage struct {
		CPU  string `json:"cpu"`
		RAM  string `json:"ram"`
		Disk string `json:"disk"`
	} `json:"percentage"`
}

type Static struct {
	Values struct {
		CPU  string `json:"cpu"`
		RAM  string `json:"ram"`
		Disk string `json:"disk"`
	} `json:"values"`
	Extras struct {
		SystemHostname        string `json:"system_hostname"`
		OperatingSystem       string `json:"operating_system"`
		ProcessorArchitecture string `json:"processor_architecture"`
		GoVersion             string `json:"go_version"`
	} `json:"extras"`
}
