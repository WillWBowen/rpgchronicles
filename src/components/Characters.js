import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import AddCharacter from './AddCharacter'
import { getCharactersQuery } from '../queries'

const Characters = ({ user }) => {
  return (
    <div>
      <Query query={getCharactersQuery} variables={{ user }}>
        {({loading, error, data}) => {
          if(loading) return "Loading..."
          if(error) return `Error! ${error.message}`
          return (<div>
            {data.characters.map(character => (
              <Link to={`/character/${character.id}`} key={character.id}>
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">{character.name}</span>
                    <p>{character.race} {character.class}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>)
        }}
      </Query>
    <AddCharacter user={user} />
    </div>
  )
}

export default Characters
