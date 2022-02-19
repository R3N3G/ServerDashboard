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
            <div className={"mb-2 fw-bold text-" + extraInformation.color}>{staticInformation.hostname}</div>
            <div className="fw-bold mb-2 overflow-hidden overflow-ellipsis">
                <div>OS: {staticInformation.operating_system}</div>
                <div>Architecture: {staticInformation.processor_architecture}</div>
                <div>Cores: {staticInformation.total_cores} Threads: {staticInformation.total_threads}</div>
            </div>
        </div>
    );
}

interface Props {
    staticInformation: StaticInformation;
    extraInformation: ExtraInformation;
}

export default SystemExtras;
