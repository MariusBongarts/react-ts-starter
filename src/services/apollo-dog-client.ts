import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloDogClient = new ApolloClient({
  uri: 'https://71z1g.sse.codesandbox.io/',
  cache: new InMemoryCache()
});

export default apolloDogClient;
