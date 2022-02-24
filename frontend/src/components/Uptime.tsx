import React, {FC} from "react";
import {BasicHostInformation, ExtraLiveInformation} from "../../types/system";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Uptime: FC<Props> = ({extraInformation, basicInformation}) => {
    return (
        <div className="p-3 d-flex flex-column justify-content-start">
            <div className={"d-flex align-items-center overflow-ellipsis mb-2 text-" + extraInformation.color}>
                <FontAwesomeIcon icon={faPowerOff} size="1x"/>
                <div className="mb-0 ms-2">{basicInformation.uptime.days} Days</div>
            </div>
            <div className="d-flex align-items-center overflow-ellipsis">
                <pre className="mb-0 overflow-ellipsis">
                    {basicInformation.uptime.hours} hours {basicInformation.uptime.minutes} minutes {basicInformation.uptime.seconds} seconds
                </pre>
            </div>
        </div>
    );
}

interface Props {
    extraInformation: ExtraLiveInformation;
    basicInformation: BasicHostInformation;
}

export default Uptime;
