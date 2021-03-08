import './App.css';
import CardGrid, { MyCard } from './components/CardGrid';
import Language from './hooks/Language';
import SearchBar from './hooks/Searchbar';

const myCards: MyCard[] = [
  {
    title: "First"
  },
  {
    title: "Second"
  },
]
function App() {
  return (
    <div className="App">
      <Language />
      <SearchBar />
      <CardGrid cards={myCards} />
    </div>
  );
}

export default App;
