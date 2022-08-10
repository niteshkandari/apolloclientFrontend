import { gql } from "@apollo/client";

export const GET_ALL_RECIPE = gql`
  query GetAllRecipe {
    getAllRecipe {
      name
      description
      createdAt
      thumbsUp
      thumbsDown
      id
    }
  }
`;

export const GET_RECIPEBY_ID = gql`
  query Recipe($id: ID!) {
  recipe(ID: $id) {
    name,
    description,
    id
  }
}`;