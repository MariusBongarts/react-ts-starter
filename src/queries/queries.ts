import { gql } from "@apollo/client";
export interface GraphQlResult {
    __typename: string;
}

export interface ExchangeRate extends GraphQlResult {
    currency: string;
    rate: string;
}

export const EXCHANGE_RATES = gql`
query GetExchangeRates {
  rates(currency: "USD") {
    currency
    rate
  }
}
`;