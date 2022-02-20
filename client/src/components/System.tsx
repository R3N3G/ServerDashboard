import SystemBottom from "./SystemBottom";
import SystemTop from "./SystemTop";
import {FC} from "react";
import {BasicInformation, ExtraInformation} from "../../types/system";
import SystemMiddle from "./SystemMiddle";

const System: FC<Props> = ({staticInfo, basicInformation, extraInformation}) => {
    return (
        <div className={"text-nowrap"}>
            <SystemTop name={staticInfo.name} extraInformation={extraInformation} basicInformation={basicInformation}/>
            <SystemMiddle basicInformation={basicInformation} extraInformation={extraInformation}/>
            <SystemBottom info1={staticInfo.info1} info2={staticInfo.info2} info3={staticInfo.info3}/>
        </div>
    );
}

interface Props {
    staticInfo: {
        name: string
        info1: string,
        info2: string,
        info3: string,
    };
    basicInformation: BasicInformation;
    extraInformation: ExtraInformation;
}

export default System;
