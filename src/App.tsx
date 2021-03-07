import './App.css';
import CardGrid, { MyCard } from './components/CardGrid';

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
      <CardGrid cards={myCards} />
    </div>
  );
}

export default App;
