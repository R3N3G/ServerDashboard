import React, {FC} from "react";
import {Extras} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

const SystemExtras: FC<Props> = ({systemType, icon}) => {
    return (
        <div className={"d-flex align-items-center justify-content-center"}>
            <FontAwesomeIcon icon={icon} size="2x"/>
            <div className={"ms-3 fw-bold"}>{systemType.operating_system}</div>
            <div className={"ms-2"}>{systemType.processor_architecture} {systemType.go_version}</div>
        </div>
    );
}

interface Props {
    systemType: Extras;
    icon: IconDefinition;
}

export default SystemExtras;
