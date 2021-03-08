import axios from "axios";
import { useRef, useState } from "react";
import { MyCard } from "../components/CardGrid";

export type SearchBarProps = {
    getCards: (cards: MyCard[]) => void;
};

function SearchBar({ getCards }: SearchBarProps) {
    const [query, setQuery] = useState("react hooks");
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
        getCards(result.data.hits);
    };

    function handleSearch(event: any) {
        event.preventDefault();
        fetchData();
    }

    return (
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
    );
}

export default SearchBar;