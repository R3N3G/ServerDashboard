import {FC} from "react";

const SystemBottom: FC<Props> = (props) => {
    return (
        <div className="row pt-3 p-2 small">
            <div className="col">
                <span className="ms-2">{props.info1}</span>
            </div>
            <div className="col">
                <span className="ms-2">{props.info2}</span>
            </div>
        </div>
    );
}

interface Props {
    info1: string;
    info2: string;
}

export default SystemBottom;
