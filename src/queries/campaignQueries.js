import {gql} from 'apollo-boost'

const addCampaignMutation = gql`
  mutation ($input: CreateCampaignInput!) {
    addCampaign(input: $input) {
      id
      title
    }
  }
`

const getCampaignsQuery = gql`
  query ($user: String!){
    campaigns(user: $user){
      id
      title
    }
  }
`

const getCampaignQuery = gql`
  query ($campaign: ID!) {
    campaign(campaign: $campaign) {
      id
      title
      description
    }
  }
`

export { addCampaignMutation, getCampaignsQuery, getCampaignQuery }
