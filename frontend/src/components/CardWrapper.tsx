import {FC} from "react";

const CardWrapper: FC<Props> = (props) => {
    return (
        <div className="col-lg-6 col-sm-12 g-3" style={{height: "280px"}}>
            <div className={`card rounded h-100 shadow bg-white`}>
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

export default CardWrapper;
