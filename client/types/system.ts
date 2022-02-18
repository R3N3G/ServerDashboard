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

export interface StaticInformation {
    processor: string,
    total_cores: number,
    total_threads: number,
    processor_architecture: string,
    operating_system: string,
    total_disk_string: string,
    total_disk_number: number,
    total_ram_string: string,
    total_ram_number: number,
    hostname: string,
}

export interface ExtraInformation {
    color: 'success' | 'danger' | 'warning' | 'info' | string;
    icon: IconDefinition
}
