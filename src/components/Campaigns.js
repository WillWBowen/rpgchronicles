import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import AddCampaign from './AddCampaign'
import { getCampaignsQuery } from '../queries'

const Campaigns = ({ user }) => {
  return (
    <div>
      <Query query={getCampaignsQuery} variables={{ user }}>
        {({loading, error, data}) => {
          if(loading) return "Loading..."
          if(error) return `Error! ${error.message}`
          return (<div>
            {data.campaigns.map(campaign => (
              <Link to={`/campaign/${campaign.id}`} key={campaign.id}>
                <div className="card" >
                  <div className="card-content">
                    <span className="card-title">{campaign.title}</span>
                    <p>{campaign.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>)
        }}
      </Query>
    <AddCampaign user={user} />
    </div>
  )
}

export default Campaigns
