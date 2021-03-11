import './App.css';
import Language from './hooks/Language';
import SearchBar from './hooks/Searchbar';
import GraphQlSandbox from './hooks/GraphQlSandbox';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './services/apollo-client';


function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <GraphQlSandbox />
        <Language />
        <SearchBar />
      </div>
    </ApolloProvider>
  );
}

export default App;
