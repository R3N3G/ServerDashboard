import React, {FC} from "react";
import {BasicHostInformation, ExtraInformation, StaticInformation} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DarkMode from "./darkMode";

const SystemExtras: FC<Props> = ({staticInformation, basicInformation, extraInformation}) => {
    return (
        <div className={"p-3 text-nowrap position-relative"}>
            <DarkMode/>
            <div className={"mb-2 text-" + extraInformation.color}>
                <FontAwesomeIcon icon={extraInformation.icon} size="2x"/>
            </div>
            <div className={"mb-2 fw-bold text-" + extraInformation.color}>{staticInformation.host.server_name}</div>
            <div>{staticInformation.host.operating_system}</div>
            <div>{staticInformation.host.platform} {staticInformation.host.platform_version}</div>
            <div>{basicInformation.uptime}</div>
        </div>
    );
}

interface Props {
    staticInformation: StaticInformation;
    basicInformation: BasicHostInformation;
    extraInformation: ExtraInformation;
}

export default SystemExtras;
