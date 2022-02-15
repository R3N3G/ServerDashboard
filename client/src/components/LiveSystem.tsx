import {FC} from "react";
import {ProgressBar} from "react-bootstrap";

const LiveSystem: FC<Props> = (props) => {
    return (
        <div className={"my-2"}>
            <div className={"fw-bold"}><span>{props.name}:</span> <span
                className={"text-" + props.variant}>{props.value}</span></div>
            <ProgressBar animated now={props.percentage} variant={props.variant}/>
        </div>
    );
}

interface Props {
    name: string,
    value: string,
    percentage: number;
    variant?: 'success' | 'danger' | 'warning' | 'info' | string;
}

export default LiveSystem;