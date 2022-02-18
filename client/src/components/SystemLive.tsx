import React, {FC} from "react";
import {SystemType} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ProgressBar} from "react-bootstrap";

const SystemLive: FC<Props> = ({systemType, percentage, staticValue, liveValue}) => {
    return (
        <div>
            <div className={"mb-2"}>
                <FontAwesomeIcon icon={systemType.icon} size="2x"/>
            </div>
            <div className={"mb-2"}>
                {systemType.name}
            </div>
            <div className={`fw-bold mb-2 ${"text-" + systemType.color}`}>
                {liveValue && <span>{liveValue} / </span>}
                <span>{staticValue}</span>
            </div>
            <ProgressBar min={0} max={100} animated now={percentage} variant={systemType.color}/>
        </div>
    );
}

interface Props {
    systemType: SystemType;
    percentage: number;
    staticValue: string;
    liveValue?: string;
}

export default SystemLive;
