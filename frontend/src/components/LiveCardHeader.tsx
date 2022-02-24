import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {FC} from "react";
import {BasicSystemInformation, ExtraLiveInformation} from "../../types/system";
import DarkModeSwitch from "./DarkModeSwitch";

const LiveCardHeader: FC<Props> = ({staticInfo, basicInformation, extraInformation}) => {
    return (
        <div className="d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center overflow-ellipsis">
                <div className={"me-3 text-" + extraInformation.color}>
                    <FontAwesomeIcon icon={extraInformation.icon} size="3x"/>
                </div>
                <div className="d-flex flex-column overflow-ellipsis">
                    <div className="d-flex align-items-center">
                        <span className="fw-bold overflow-ellipsis">{staticInfo.name}</span>
                        <span className={"overflow-ellipsis ms-2 small text-" + extraInformation.color}>
                        ({staticInfo.info})
                    </span>
                    </div>
                    <div className="small overflow-ellipsis">
                        {basicInformation.value} {staticInfo.total && " / " + staticInfo.total}
                    </div>
                </div>
            </div>
            <div className="fs-2">
                {basicInformation.percentage !== -1 ? basicInformation.percentage + "%" : <DarkModeSwitch/>}
            </div>
        </div>
    );
}

interface Props {
    staticInfo: {
        name: string,
        total?: string,
        info: string,
    };
    basicInformation: BasicSystemInformation;
    extraInformation: ExtraLiveInformation;
}

export default LiveCardHeader;
