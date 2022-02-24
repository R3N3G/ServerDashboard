import React, {FC} from "react";
import {BasicHostInformation, ExtraLiveInformation, StaticInformation} from "../../types/system";
import DarkMode from "./DarkMode";
import SystemTop from "./SystemTop";

const SystemExtras: FC<Props> = ({staticInformation, basicInformation, extraInformation}) => {
    return (
        <div>
            <DarkMode/>
            <div className="text-nowrap h-100 d-flex flex-column justify-content-between">
                <SystemTop name={staticInformation.host.server_name}
                           basicInformation={
                               {
                                   value: staticInformation.host.operating_system + " " + staticInformation.host.platform + " " + staticInformation.host.platform_version,
                                   percentage: -1,
                               }
                           }
                           extraInformation={extraInformation}
                />
                <div className="px-3 pb-3">Uptime: {basicInformation.uptime}</div>
            </div>
        </div>
    );
}

interface Props {
    staticInformation: StaticInformation;
    basicInformation: BasicHostInformation;
    extraInformation: ExtraLiveInformation;
}

export default SystemExtras;
