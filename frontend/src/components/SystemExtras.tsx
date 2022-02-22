import React, {FC} from "react";
import {BasicHostInformation, ExtraInformation, StaticInformation} from "../../types/system";
import DarkMode from "./DarkMode";
import SystemTop from "./SystemTop";

const SystemExtras: FC<Props> = ({staticInformation, basicInformation, extraInformation}) => {
    return (
        <div className={"text-nowrap"}>
            <SystemTop name={staticInformation.host.server_name}
                       basicInformation={
                           {
                               value: staticInformation.host.operating_system + " " + staticInformation.host.platform + " " + staticInformation.host.platform_version,
                               percentage: -1,
                           }
                       }
                       extraInformation={extraInformation}
            />
            <DarkMode/>
            <div className="px-3 pb-3">Uptime: {basicInformation.uptime}</div>
        </div>
    );
}

interface Props {
    staticInformation: StaticInformation;
    basicInformation: BasicHostInformation;
    extraInformation: ExtraInformation;
}

export default SystemExtras;
