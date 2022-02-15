import {FC} from "react";
import {ProgressBar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

const LiveSystem: FC<Props> = (props) => {
    return (
        <div className={"mb-4"}>
            <div className={"mb-3"}>
                <FontAwesomeIcon icon={props.icon} size="3x"/>
            </div>
            <div className={"fw-bold mb-2"}><
                span>{props.name}: </span>
                <span className={"text-" + props.variant}>{props.value}</span>
            </div>
            <ProgressBar animated now={props.percentage} variant={props.variant}/>
        </div>
    );
}

interface Props {
    name: string,
    value: string,
    percentage: number;
    variant?: 'success' | 'danger' | 'warning' | 'info' | string;
    icon: IconDefinition;
}

export default LiveSystem;