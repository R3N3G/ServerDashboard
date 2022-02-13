export interface Live {
    values: {
        ram: string,
        disk: string,
    },
    percentage: {
        cpu: string,
        ram: string,
        disk: string,
    },
}

export interface Static {
    values: {
        cpu: string,
        ram: string,
        disk: string,
    },
    extras: {
        operating_system: string,
        processor_architecture: string,
        go_version: string,
    },
}