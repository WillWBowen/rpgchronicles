import {gql} from 'apollo-boost'

const addSessionMutation = gql`
  mutation ($input: CreateSessionInput!) {
    addSession(input: $input) {
      id
      campaign {
        id
      }
      title
      description
    }
  }
`

const getSessionsQuery = gql`
  query ($campaign: ID!){
    campaignSessions(campaign: $campaign){
      id
      campaign {
        id
      }
      title
      description
    }
  }
`
const updateSessionMutation = gql`
  mutation ($input: UpdateSessionInput!) {
    updateSession(input: $input) {
      id
      campaign {
        id
      }
      title
      description
    }
  }
`

export { addSessionMutation, getSessionsQuery, updateSessionMutation }
