import './App.css';
import Graph from './hooks/Graph';
import GraphExample from './test/App';
import { data } from './miserables';

function App() {
  return (
    <div className='App'>
      <Graph />
      <GraphExample
        width={window.screen.availWidth}
        height={window.screen.availHeight}
        graph={data}
      />
    </div>
  );
}

export default App;
