import { useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { GET_DOGS, Dog } from '../queries/queries';
import DogPhoto from './DogPhoto';

function Dogs() {
    const { loading, data } = useQuery<{ dogs: Omit<Dog, 'displayName'>[] }>(GET_DOGS);

    const [selectedBreed, setSelectedBreed] = useState<string>('');

    const onSelectionChange = (changeEvent: ChangeEvent<HTMLSelectElement>) => setSelectedBreed(changeEvent.target.value);

    const breedSelection = loading ? <h1>Loading...</h1> : <select name="dog" onChange={onSelectionChange}>
        {data?.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
                {dog.breed}
            </option>
        ))}
    </select>

    return <div>
        {breedSelection}
        {selectedBreed && <DogPhoto breed={selectedBreed}/>}
    </div>
        ;
}

export default Dogs;