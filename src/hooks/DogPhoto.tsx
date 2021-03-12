import { FC } from "react";
type Props = {
    breed: string;
}
const DogPhoto: FC<Props> = ({ breed }) => {


    return <h1>{breed}</h1>
        ;
}

export default DogPhoto;