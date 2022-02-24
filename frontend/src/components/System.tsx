import SystemBottom from "./SystemBottom";
import SystemTop from "./SystemTop";
import {FC} from "react";
import {BasicSystemInformation, ExtraLiveInformation} from "../../types/system";
import SystemMiddle from "./SystemMiddle";

const System: FC<Props> = ({staticInfo, basicInformation, extraInformation}) => {
    return (
        <div className={"text-nowrap"}>
            <SystemTop name={staticInfo.name} extraInformation={extraInformation} basicInformation={basicInformation}/>
            <SystemMiddle extraInformation={extraInformation}/>
            <SystemBottom info1={staticInfo.info1} info2={staticInfo.info2}/>
        </div>
    );
}

interface Props {
    staticInfo: {
        name: string
        info1: string,
        info2: string,
    };
    basicInformation: BasicSystemInformation;
    extraInformation: ExtraLiveInformation;
}

export default System;