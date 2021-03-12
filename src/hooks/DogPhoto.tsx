import { useQuery } from "@apollo/client";
import { FC } from "react";
import { Dog, GET_DOG_PHOTO } from "../queries/queries";
type Props = {
    breed: string;
}
const DogPhoto: FC<Props> = ({ breed }) => {

    const result = useQuery<{ dog: Omit<Dog, 'breed'> }>(GET_DOG_PHOTO, { variables: { breed } });

    return <img alt={breed} src={result.data?.dog.displayImage}></img>
        ;
}

export default DogPhoto;