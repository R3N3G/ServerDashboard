import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export interface BasicSystemInformation {
    value: string,
    percentage: number,
}

export interface BasicHostInformation {
    uptime: string,
}

export interface LiveInformation {
    cpu: BasicSystemInformation,
    ram: BasicSystemInformation,
    disk: BasicSystemInformation,
    host: BasicHostInformation,
}

export interface processor {
    name: string,
    speed: string,
    threads: number,
    architecture: string,
}

export interface host {
    server_name: string,
    operating_system: string,
    platform: string,
    platform_version: string,
    processes: number,
    partitions: number,
}

export interface storage {
    readable: string,
    value: number,
    unit: number,
}

export interface StaticInformation {
    processor: processor,
    host: host,
    ram: storage,
    disk: storage,
}

export interface ExtraLiveInformation {
    color: 'success' | 'danger' | 'warning' | 'info' | string,
    icon: IconDefinition,
    chartData?: number[],
    chartLabelX?: string[],
}
