import gql from 'graphql-tag';

export const COCKTAIL_BY_ID_QUERY = gql`
  query GetCocktailById($id: String!) {
    cocktail(id: $id) {
      _id
      description
      garnish {
        _id
        name
        type
      }
      glassType {
        _id
        name
      }
      image
      ingredients {
        _id
        amount
        name
        unit
      }
      instructions
      mixingMethod
      name
      spirits {
        _id
        name
        parent
      }
    }
  }
`;
