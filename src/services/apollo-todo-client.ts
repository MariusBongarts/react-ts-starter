import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloTodoClient = new ApolloClient({
  uri: 'https://sxewr.sse.codesandbox.io/',
  cache: new InMemoryCache()
});

export default apolloTodoClient;