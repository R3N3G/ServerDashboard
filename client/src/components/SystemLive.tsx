import React, {FC} from "react";
import {SystemType} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ProgressBar} from "react-bootstrap";

const SystemLive: FC<Props> = ({systemType, percentage, staticValue, liveValue}) => {
    return (
        <div>
            <div className={"p-2"}>
                <div className={"mb-2 text-" + systemType.color}>
                    <FontAwesomeIcon icon={systemType.icon} size="2x"/>
                </div>
                <div className={"fw-bold mb-2"}>
                    {liveValue && <span className={"mb-2 text-" + systemType.color}>{liveValue}</span>}
                    {liveValue && <span> / </span>}
                    {staticValue}
                </div>
            </div>
            <div className={"p-3 pt-0 rounded-bottom"}>
                <ProgressBar min={0} max={100} animated now={percentage} variant={systemType.color}/>
            </div>
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
