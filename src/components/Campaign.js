import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import Sessions from './Sessions'
import { getCampaignQuery } from '../queries'

const Campaign = (props) => {
  const { campaign } = props.match.params
  return (
    <div>
      <Query query={getCampaignQuery} variables={{ campaign }}>
        {({loading, error, data}) => {
          if(loading) return "Loading..."
          if(error) return `Error! ${error.message}`
          return (<div>
                <div className="card">
                  <div className="card-content">
                    <h3>{data.campaign.title}</h3>
                    <p>{data.campaign.description}</p>
                  </div>
                </div>
                <Sessions campaign={campaign} />
                <Link to={{ pathname: '/session', state: {campaign: campaign}}}>
                  <button>Add Session</button>
                </Link>

          </div>)
        }}
      </Query>
    </div>
  )
}

export default Campaign
