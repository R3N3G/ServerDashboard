import {ProgressBar} from "react-bootstrap";
import React, {FC} from "react";
import {BasicSystemInformation, ExtraInformation} from "../../types/system";

const SystemMiddle: FC<Props> = ({basicInformation, extraInformation}) => {
    return (
        <div className={"px-3 rounded-bottom"}>
            <ProgressBar min={0} max={100} animated now={basicInformation.percentage}
                         variant={extraInformation.color}/>
        </div>
    );
}

interface Props {
    basicInformation: BasicSystemInformation;
    extraInformation: ExtraInformation;
}

export default SystemMiddle;
