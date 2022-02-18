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
    processor_architecture: string,
    core_count: number,
    operating_system: string,
    available_ram: string,
    available_disk: string,
}

export interface ExtraInformation {
    color: 'success' | 'danger' | 'warning' | 'info' | string;
    icon: IconDefinition
}
