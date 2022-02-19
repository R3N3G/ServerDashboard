import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export interface BasicInformation {
    value: string,
    percentage: number
}

export interface LiveInformation {
    cpu: BasicInformation,
    ram: BasicInformation,
    disk: BasicInformation,
}

export interface processor {
    name: string,
    cores: number,
    threads: number,
    architecture: string,
}

export interface host {
    server_name: string
    operating_system: string
}

export interface storage {
    readable: string
    value: number
    unit: number
}

export interface StaticInformation {
    processor: processor
    host: host
    memory: storage
    disk: storage
}

export interface ExtraInformation {
    color: 'success' | 'danger' | 'warning' | 'info' | string;
    icon: IconDefinition
}
