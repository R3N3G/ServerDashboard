import {FC} from "react";

const CardBig: FC<Props> = (props) => {
    return (
        <div className={"col-12"}>
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

export default CardBig;
