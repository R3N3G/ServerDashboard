import {FC} from "react";
import {ProgressBar} from "react-bootstrap";

const Percentage: FC<Props> = ({percentage}) => {
    return (
        <div>
            <ProgressBar animated now={percentage}/>
        </div>
    );
}

interface Props {
    percentage: number;
}

export default Percentage;