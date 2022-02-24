import React, {FC} from "react";
import {ExtraLiveInformation} from "../../types/system";
import MyChart from "./MyChart";

const SystemMiddle: FC<Props> = ({extraInformation}) => {
    return (
        <div className={"px-3 rounded-bottom"}>
            <MyChart extraInformation={extraInformation}/>
        </div>
    );
}

interface Props {
    extraInformation: ExtraLiveInformation;
}

export default SystemMiddle;
