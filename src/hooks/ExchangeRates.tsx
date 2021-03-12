import { useQuery } from '@apollo/client';
import { EXCHANGE_RATES, ExchangeRate } from '../queries/queries';

function ExchangeRates() {
    const result = useQuery<{ rates: ExchangeRate[] }>(EXCHANGE_RATES);

    return <div>
        {
            result.loading ? <h1>Loading....</h1> : <h1>{`Found ${result.data?.rates.length} exchange rates`}</h1>
        }
    </div>
}

export default ExchangeRates;