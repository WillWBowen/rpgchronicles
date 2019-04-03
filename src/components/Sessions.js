import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { getSessionsQuery } from '../queries'

const Sessions = ({ campaign }) => {
  return (
    <div>
      <Query query={getSessionsQuery} variables={{ campaign }}>
        {({loading, error, data}) => {
          console.log(data)
          if(loading) return "Loading..."
          if(error) return `Error! ${error.message}`
          return (<div>
            {data.campaignSessions.map(session => (
              <Link to={{
                pathname: `/session/${session.id}`,
                state: {
                  title: session.title,
                  description: session.description,
                  campaign: session.campaign.id
                }
              }} key={session.id}>
              <div className="card">
                <div className="card-content">
                  <span className="card-title">{session.title}</span>
                  <p>{session.description}</p>
                </div>
              </div>
              </Link>
            ))}
          </div>)
        }}
      </Query>
    </div>
  )
}

export default Sessions
