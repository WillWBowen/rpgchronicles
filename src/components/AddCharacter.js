import React, { Component } from 'react'
import { graphql } from "react-apollo"
import auth from '../services/Auth'
import {addCharacterMutation, getCharactersQuery} from '../queries'

class AddCharacter extends Component {
  state = {
    name: '',
    race: '',
    charClass: ''
  }
  handleSubmit = (e) => {
    console.log(this.props)
    e.preventDefault()
    let input = {
      name: this.state.name,
      race: this.state.race,
      class: this.state.charClass,
      user: auth.getEmail()
    }
    this.props.mutate({
      variables: {
        input: input
      },
      refetchQueries: [{
        query: getCharactersQuery,
        variables: {user: auth.getEmail()}
      }]
    })
    this.setState({
      name: '',
      race: '',
      charClass: ''
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  render() {
    const { name, race, charClass } = this.state
    return (
          <div>
            <form id="add-character" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" onChange={this.handleChange} value={name}/>
            <label htmlFor="race">Race:</label>
            <input type="text" id="race" onChange={this.handleChange} value={race}/>
            <label htmlFor="charClass">Class:</label>
            <input type="text" id="charClass" onChange={this.handleChange} value={charClass}/>
            <button>Create Character</button>
            </form>
          </div>
    )
  }
}

export default graphql(addCharacterMutation)(AddCharacter)
