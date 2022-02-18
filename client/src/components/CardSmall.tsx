import {FC} from "react";

const CardSmall: FC<Props> = (props) => {
    return (
        <div className={"col-md-6 col-sm-12"}>
            <div className={`card rounded`}>
                <div className={"card-body"}>
                    {props.element}
                </div>
            </div>
        </div>
    );
}

interface Props {
    element: JSX.Element
}

export default CardSmall;
