import React, {FC} from "react";
import {Extras} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

const SystemExtras: FC<Props> = ({systemType, icon, name, color}) => {
    return (
        <div>
            <div className={"mb-2"}>
                <FontAwesomeIcon icon={icon} size="2x"/>
            </div>
            <div className={"mb-2"}>
                {name}
            </div>
            <div className={`fw-bold ${"text-" + color}`}>{systemType.operating_system}</div>
            <div>{systemType.processor_architecture} {systemType.go_version}</div>
        </div>
    );
}

interface Props {
    systemType: Extras;
    icon: IconDefinition;
    name: string;
    color: string;
}

export default SystemExtras;
