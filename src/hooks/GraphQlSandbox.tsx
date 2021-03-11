import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { EXCHANGE_RATES, GraphQlResult, ExchangeRate } from '../queries/queries';

function GraphQlSandbox() {
    const { loading, error, data } = useQuery<{ rates: ExchangeRate[] }>(EXCHANGE_RATES);

    return loading ? <h1>Loading....</h1> : <h1>{`Found ${data?.rates.length} exchange rates`}</h1>
}

export default GraphQlSandbox;