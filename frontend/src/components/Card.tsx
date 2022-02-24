import {FC} from "react";

const Card: FC<Props> = (props) => {
    return (
        <div className="col-lg-6 col-sm-12 g-3" style={{height: "280px"}}>
            <div className={`card h-100 rounded shadow bg-white`}>
                <div className={"card-body p-0 m-0"}>
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
