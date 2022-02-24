import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC} from "react";
import {BasicSystemInformation, ExtraLiveInformation} from "../../types/system";

const SystemTop: FC<Props> = ({name, basicInformation, extraInformation}) => {
    return (
        <div className="d-flex align-items-center p-3">
            <span className={"text-" + extraInformation.color}>
                <FontAwesomeIcon icon={extraInformation.icon} size="2x"/>
            </span>
            <div className="d-flex flex-column">
                <span className="ms-3 fw-bold">{name}</span>
                <span className="ms-3 small">{basicInformation.value}</span>
            </div>
            <div className="position-absolute top-0 end-0 p-3 sticky-top fs-3">
                {basicInformation.percentage != -1 && basicInformation.percentage + " %"}
            </div>
        </div>
    );
}

interface Props {
    name: string;
    basicInformation: BasicSystemInformation;
    extraInformation: ExtraLiveInformation;
}

export default SystemTop;
