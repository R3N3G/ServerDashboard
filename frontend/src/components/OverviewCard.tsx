import React, {FC} from "react";
import {BasicHostInformation, ExtraLiveInformation, StaticInformation} from "../../types/system";
import DarkModeSwitch from "./DarkModeSwitch";
import LiveCardHeader from "./LiveCardHeader";
import Uptime from "./Uptime";

const OverviewCard: FC<Props> = ({staticInformation, basicInformation, extraInformation}) => {
    return (
        <div className="h-100 d-flex flex-column justify-content-between">
            <DarkModeSwitch/>
            <LiveCardHeader
                staticInfo={{name: staticInformation.host.server_name, info: staticInformation.processor.architecture}}
                basicInformation={
                    {
                        value: staticInformation.host.operating_system + " " + staticInformation.host.platform + " " + staticInformation.host.platform_version,
                        percentage: -1,
                    }
                }
                extraInformation={extraInformation}
            />
            <Uptime extraInformation={extraInformation} basicInformation={basicInformation}/>
        </div>
    );
}

interface Props {
    staticInformation: StaticInformation;
    basicInformation: BasicHostInformation;
    extraInformation: ExtraLiveInformation;
}

export default OverviewCard;
