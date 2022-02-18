import React, {FC} from "react";
import {Extras} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

const SystemExtras: FC<Props> = ({systemType, icon}) => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={icon} size="3x"/>
            <div className="ms-3 d-flex flex-column align-items-start">
                <div className="fw-bold">{systemType.operating_system}</div>
                <div>Architecture: {systemType.processor_architecture}</div>
            </div>
        </div>
    );
}

interface Props {
    systemType: Extras;
    icon: IconDefinition;
}

export default SystemExtras;
