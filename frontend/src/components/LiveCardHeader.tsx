import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC} from "react";
import {BasicSystemInformation, ExtraLiveInformation} from "../../types/system";

const LiveCardHeader: FC<Props> = ({staticInfo, basicInformation, extraInformation}) => {
    return (
        <div className="d-flex align-items-center p-3">
            <span className={"me-3 text-" + extraInformation.color}>
                <FontAwesomeIcon icon={extraInformation.icon} size="3x"/>
            </span>
            <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                    <span className="fw-bold">{staticInfo.name}</span>
                    <span className={"ms-2 small text-" + extraInformation.color}>({staticInfo.info})</span>
                </div>
                <span
                    className="small">{basicInformation.value} {staticInfo.total && " / " + staticInfo.total}</span>
            </div>
            <div className="position-absolute top-0 end-0 p-3 sticky-top fs-2">
                {basicInformation.percentage !== -1 && basicInformation.percentage + " %"}
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
