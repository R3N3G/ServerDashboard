import LiveCardHeader from "./LiveCardHeader";
import {FC} from "react";
import {BasicSystemInformation, ExtraLiveInformation} from "../../types/system";
import LiveCardChartJS from "./LiveCardChartJS";

const LiveCard: FC<Props> = ({staticInfo, basicInformation, extraInformation}) => {
    return (
        <div className="text-nowrap h-100 d-flex flex-column justify-content-between">
            <LiveCardHeader staticInfo={staticInfo} extraInformation={extraInformation}
                            basicInformation={basicInformation}/>
            <LiveCardChartJS extraInformation={extraInformation}/>
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

export default LiveCard;
