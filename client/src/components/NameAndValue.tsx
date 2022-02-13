import {FC} from "react";

const NameAndValue: FC<Props> = ({name, value}) => {

    return (
        <div>{name}: {value}</div>
    );
}

interface Props {
    name: string;
    value: string;
}

export default NameAndValue;