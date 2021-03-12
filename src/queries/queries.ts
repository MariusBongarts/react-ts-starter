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
    displayImage: string;
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

export interface Todo extends GraphQlResult {
  id: string;
  type: string;
}

export const GET_TODOS = gql`
  {
    todos {
      id
      type
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;
