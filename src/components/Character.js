import React from 'react'
import { Query } from 'react-apollo'
import { getCharacterQuery } from '../queries'

const Character = (props) => {
  const { character } = props.match.params
  return (
    <div>
      <Query query={getCharacterQuery} variables={{ character }}>
        {({loading, error, data}) => {
          if(loading) return "Loading..."
          if(error) return `Error! ${error.message}`
          return (<div>
            <div className="card">
              <div className="card-content">
                <h3>{data.character.name}</h3>
                <p>{data.character.race}</p>
                <p>{data.character.class}</p>
              </div>
            </div>
          </div>)
        }}
      </Query>
    </div>
  )
}

export default Character
