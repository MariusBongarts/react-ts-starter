import { ApolloProvider, useQuery } from '@apollo/client';
import { EXCHANGE_RATES, ExchangeRate } from '../queries/queries';
import apolloDogClient from '../services/apollo-dog-client';
import Dogs from './Dogs';
function GraphQlSandbox() {
    const result = useQuery<{ rates: ExchangeRate[] }>(EXCHANGE_RATES);

    return <div>
        {
            result.loading ? <h1>Loading....</h1> : <h1>{`Found ${result.data?.rates.length} exchange rates`}</h1>
        }
        <ApolloProvider client={apolloDogClient}><Dogs /></ApolloProvider>
    </div>
}

export default GraphQlSandbox;