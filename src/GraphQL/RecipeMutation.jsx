import { gql } from "@apollo/client";

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($recipeInput: RecipeInput!) {
    createRecipe(recipeInput: $recipeInput) {
      name
      description
      createdAt
      thumbsUp
      thumbsDown
      id
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(ID: $id)
  }
`;

export const EDIT_RECIPE = gql`
  mutation EditRecipe($id: ID!, $recipeInput: RecipeInput) {
    editRecipe(ID: $id, recipeInput: $recipeInput)
  }
`;
