import axios from "axios";
import { useRef, useState } from "react";
import CardGrid, { MyCard } from "../components/CardGrid";
import { CardContext } from "../contexts/CardContext";


function SearchBar() {
    const [query, setQuery] = useState("react hooks");
    const [cards, setCards] = useState<MyCard[]>([])
    /* We can pass useRef a default value.
       We don't need it here, so we pass in null to reference an empty object
    */
    const searchInput = useRef<any>(null);

    function handleClearSearch() {
        /* 
          .current references the input element upon mount
          useRef can store basically any value in its .current property
        */
        searchInput.current.value = "";
        searchInput.current.focus();
    }

    const fetchData = async () => {
        const endpoint = 'https://hn.algolia.com/api/v1/';
        const result = await axios(
            `${endpoint}search?query=${query}`,
        );
        const cardsResult = result.data.hits as MyCard[];
        setCards(cardsResult);
    };

    function handleSearch(event: any) {
        event.preventDefault();
        fetchData();
    }

    return (
        <CardContext.Provider value={{ cards }}>
            <form>
                <input
                    type="text"
                    onChange={event => setQuery(event.target.value)}
                    ref={searchInput}
                />
                <button onClick={handleSearch}>Search</button>
                <button type="button" onClick={handleClearSearch}>
                    Clear
        </button>
            </form>
            <CardGrid />
        </CardContext.Provider>

    );
}

export default SearchBar;