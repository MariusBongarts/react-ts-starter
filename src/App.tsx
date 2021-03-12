import './App.css';
import Language from './hooks/Language';
import SearchBar from './hooks/Searchbar';
import GraphQlSandbox from './hooks/GraphQlSandbox';
import { ApolloProvider } from '@apollo/client';
import apolloRateClient from './services/apollo-rate-client';

function App() {
  return (
    <ApolloProvider client={apolloRateClient}>
      <div className="App">
        <GraphQlSandbox />
        <Language />
        <SearchBar />
      </div>
    </ApolloProvider>
  );
}

export default App;
