import React, {FC} from "react";
import {BasicHostInformation, ExtraLiveInformation} from "../../types/system";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Uptime: FC<Props> = ({extraInformation, basicInformation}) => {
    return (
        <div className="p-3 d-flex align-items-center justify-content-start">
            <span className={"me-3 text-" + extraInformation.color}>
                <FontAwesomeIcon icon={faPowerOff} size="1x"/>
            </span>
            <div className="d-flex align-items-center">
                <pre className="mb-0 me-4">{basicInformation.uptime.days} Days</pre>
                <pre className="mb-0 me-2">{basicInformation.uptime.hours} Hours</pre>
                <pre className="mb-0 me-2">{basicInformation.uptime.minutes} Minutes</pre>
                <pre className="mb-0">{basicInformation.uptime.seconds} Seconds</pre>
            </div>
        </div>
    );
}

interface Props {
    extraInformation: ExtraLiveInformation;
    basicInformation: BasicHostInformation;
}

export default Uptime;
