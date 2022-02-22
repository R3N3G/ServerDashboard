import {FC} from "react";

const Card: FC<Props> = (props) => {
    return (
        <div className="col-lg-6 col-sm-12">
            <div className={`card rounded shadow bg-white`}>
                <div className={"card-body p-0 m-0"} style={{height: "280px"}}>
                    {props.element}
                </div>
            </div>
        </div>
    );
}

interface Props {
    element: JSX.Element
}

export default Card;
