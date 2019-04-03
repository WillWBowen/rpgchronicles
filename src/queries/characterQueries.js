import {gql} from 'apollo-boost'

const addCharacterMutation = gql`
  mutation ($input: CreateCharacterInput!) {
    addCharacter(input: $input) {
      id
      name
      class
      race
    }
  }
`

const getCharactersQuery = gql`
  query Character($user: String!){
    characters(user: $user){
      id
      name
      race
      class
    }
  }
`

export { addCharacterMutation, getCharactersQuery }
