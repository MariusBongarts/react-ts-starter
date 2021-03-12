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

export interface Dog extends GraphQlResult {
    id: string;
    breed: string;
}

export const GET_DOGS = gql`
      {
        dogs {
          id
          breed
        }
      }
    `;

export const GET_DOG_PHOTO = gql`
  query dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;
