import React, {FC} from "react";
import {BasicHostInformation, ExtraLiveInformation} from "../../types/system";
import {Power} from "react-bootstrap-icons";

const Uptime: FC<Props> = ({extraInformation, basicInformation}) => {
    return (
        <div className="p-3 d-flex align-items-start">
            <div className={"me-2 text-" + extraInformation.color}>
                <Power size={40}/>
            </div>
            <div className="d-flex flex-column align-items-start overflow-ellipsis">
                <pre className="mb-0 fw-bold">{basicInformation.uptime.days} Days</pre>
                <pre className="mb-0">
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
