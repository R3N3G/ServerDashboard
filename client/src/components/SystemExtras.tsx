import React, {FC} from "react";
import {ExtraInformation, StaticInformation} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SystemExtras: FC<Props> = ({staticInformation, extraInformation}) => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={"text-" + extraInformation.color}>
                <FontAwesomeIcon icon={extraInformation.icon} size="4x"/>
            </div>
            <div className="ms-3 d-flex flex-column align-items-start">
                <div className={"fw-bold text-" + extraInformation.color}>{staticInformation.operating_system}</div>
                <div>Architecture: {staticInformation.processor_architecture}</div>
                <div>Virtual Cores: {staticInformation.core_count}</div>
            </div>
        </div>
    );
}

interface Props {
    staticInformation: StaticInformation;
    extraInformation: ExtraInformation;
}

export default SystemExtras;
