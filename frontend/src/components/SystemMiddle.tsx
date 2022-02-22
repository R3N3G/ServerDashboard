import React, {FC} from "react";
import {BasicSystemInformation, ExtraInformation} from "../../types/system";
import MyChart from "./MyChart";

const SystemMiddle: FC<Props> = ({basicInformation, extraInformation}) => {
    return (
        <div className={"px-3 rounded-bottom"}>
            <MyChart extraInformation={extraInformation} basicInformation={basicInformation}/>
        </div>
    );
}

interface Props {
    basicInformation: BasicSystemInformation;
    extraInformation: ExtraInformation;
}

export default SystemMiddle;
