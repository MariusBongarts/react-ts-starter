import { useState } from 'react';
import './App.css';
import CardGrid, { MyCard } from './components/CardGrid';
import Language from './hooks/Language';
import SearchBar from './hooks/Searchbar';


function App() {
  const [cards, setCards] = useState<MyCard[]>([])
  const getCards = (cards: MyCard[]) => {
    setCards(cards);
  };
  return (
    <div className="App">
      <Language />
      <SearchBar getCards={getCards} />
      <CardGrid cards={cards} />
    </div>
  );
}

export default App;
