import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloRateClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

export default apolloRateClient;
