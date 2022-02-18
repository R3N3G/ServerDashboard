import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export interface Live {
    values: {
        ram: string,
        disk: string,
    },
    percentage: {
        cpu: number,
        ram: number,
        disk: number,
    },
}

export interface Extras {
    operating_system: string,
    processor_architecture: string,
    core_count: number,
}

export interface Static {
    values: {
        cpu: string,
        ram: string,
        disk: string,
    },
    extras: Extras
}

export interface SystemType {
    color: 'success' | 'danger' | 'warning' | 'info' | string;
    icon: IconDefinition
}
