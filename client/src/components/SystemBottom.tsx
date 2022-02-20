import {FC} from "react";

const SystemBottom: FC<Props> = (props) => {
    return (
        <div className="row g-0 text-center">
            <div className="col p-2">
                <span className="ms-2">{props.info1}</span>
            </div>
            <div className="col p-2">
                <span className="ms-2">{props.info2}</span>
            </div>
            <div className="col p-2">
                <span className="ms-2">{props.info3}</span>
            </div>
        </div>
    );
}

interface Props {
    info1: string;
    info2: string;
    info3: string;
}

export default SystemBottom;
