import React, {FC} from "react";
import {BasicInformation, ExtraInformation} from "../../types/system";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ProgressBar} from "react-bootstrap";

const SystemLive: FC<Props> = ({basicInformation, extraInformation}) => {
    return (
        <div>
            <div className={"p-3 text-nowrap"}>
                <div className={"mb-2 text-" + extraInformation.color}>
                    <FontAwesomeIcon icon={extraInformation.icon} size="2x"/>
                </div>
                <div className="fw-bold mb-2 overflow-hidden overflow-ellipsis">
                    {basicInformation.value}
                </div>
            </div>
            <div className={"p-3 pt-0 rounded-bottom"}>
                <ProgressBar min={0} max={100} animated now={basicInformation.percentage}
                             variant={extraInformation.color}/>
            </div>
        </div>
    );
}

interface Props {
    basicInformation: BasicInformation;
    extraInformation: ExtraInformation
}

export default SystemLive;
