import {ProgressBar} from "react-bootstrap";
import React, {FC} from "react";
import {BasicInformation, ExtraInformation} from "../../types/system";

const SystemMiddle: FC<Props> = ({basicInformation, extraInformation}) => {
    return (
        <div className={"p-3 pt-0 rounded-bottom"}>
            <ProgressBar min={0} max={100} animated now={basicInformation.percentage}
                         variant={extraInformation.color}/>
        </div>
    );
}

interface Props {
    basicInformation: BasicInformation;
    extraInformation: ExtraInformation;
}

export default SystemMiddle;
