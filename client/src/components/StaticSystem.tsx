import {FC} from "react";

const StaticSystem: FC<Props> = (props) => {

    return (
        <div className={"fw-bold"}>
            <span>{props.name}:</span> <span className={"text-" + props.variant}>{props.value}</span>
        </div>
    );
}

interface Props {
    name: string;
    value: string;
    variant?: 'success' | 'danger' | 'warning' | 'info' | string;
}

export default StaticSystem;