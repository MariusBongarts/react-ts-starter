import './App.css';
import Language from './hooks/Language';
import SearchBar from './hooks/Searchbar';
import ExchangeRates from './hooks/ExchangeRates';
import { ApolloProvider } from '@apollo/client';
import apolloRateClient from './services/apollo-rate-client';
import apolloDogClient from './services/apollo-dog-client';
import apolloTodoClient from './services/apollo-todo-client';
import Dogs from './hooks/Dogs';
import Todos from './hooks/Todos';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={apolloRateClient}>
        <ExchangeRates />
      </ApolloProvider>
      <ApolloProvider client={apolloDogClient}><Dogs /></ApolloProvider>
      <ApolloProvider client={apolloTodoClient}><Todos /></ApolloProvider>
      <Language />
      <SearchBar />
    </div>
  );
}

export default App;
