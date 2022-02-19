import React, {FC} from "react";
import {ExtraInformation, StaticInformation} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DarkMode from "./darkMode";

const SystemExtras: FC<Props> = ({staticInformation, extraInformation}) => {
    return (
        <div className={"p-3 text-nowrap position-relative"}>
            <DarkMode/>
            <div className={"mb-2 text-" + extraInformation.color}>
                <FontAwesomeIcon icon={extraInformation.icon} size="2x"/>
            </div>
            <div className={"mb-2 fw-bold text-" + extraInformation.color}>{staticInformation.host.server_name}</div>
            <div className="fw-bold mb-2 overflow-hidden overflow-ellipsis">
                <div>OS: {staticInformation.host.operating_system}</div>
                <div>Architecture: {staticInformation.processor.architecture}</div>
                <div>Cores: {staticInformation.processor.cores} Threads: {staticInformation.processor.threads}</div>
            </div>
        </div>
    );
}

interface Props {
    staticInformation: StaticInformation;
    extraInformation: ExtraInformation;
}

export default SystemExtras;
