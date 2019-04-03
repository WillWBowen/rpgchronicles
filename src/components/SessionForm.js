import React, { Component } from 'react'
import { graphql, compose } from "react-apollo"
import auth from '../services/Auth'
import {getSessionsQuery, addSessionMutation, updateSessionMutation} from '../queries'

class SessionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.location.state.title || '',
      description: props.location.state.description || '',
      campaign: props.location.state.campaign || ''
    }
    if(props.match.params.session) {
      this.state.session = props.match.params.session
    }
  }

  handleMutation = (input, mutation) => {
    mutation({
      variables: {
        input: input
      },
      refetchQueries: [{
        query: getSessionsQuery,
        variables: {campaign: this.state.campaign}
      }]
    }).then(() => {
      console.log(this.state)
      this.props.history.push(`/campaign/${this.state.campaign}`)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let input = {
      title: this.state.title,
      description: this.state.description,
      campaign: this.state.campaign,
      user: auth.getEmail()
    }

    if(this.state.session) {
      input.session = this.state.session
      this.handleMutation(input, this.props.updateSessionMutation)
    } else {
      this.handleMutation(input, this.props.addSessionMutation)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  render() {
    const { title, description } = this.state
    return (
          <div>
            <form id="add-session" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" onChange={this.handleChange} value={title}/>
            <label htmlFor="description">Description:</label>
            <textarea id="description" onChange={this.handleChange} value={description}/>
            {(this.state.session) ? (<button>Update Session</button>) : (<button>Create Session</button>) }
            </form>
          </div>
    )
  }
}

export default compose(
  graphql(addSessionMutation, {name: "addSessionMutation"}),
  graphql(updateSessionMutation, {name:"updateSessionMutation"})
  )(SessionForm)
