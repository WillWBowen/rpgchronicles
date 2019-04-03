import React, { Component } from 'react'
import { graphql } from "react-apollo"
import auth from '../services/Auth'
import {addCampaignMutation, getCampaignsQuery} from '../queries'

class AddCampaign extends Component {
  state = {
    title: '',
    description: ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let input = {
      title: this.state.title,
      description: this.state.description,
      user: auth.getEmail()
    }
    this.props.mutate({
      variables: {
        input: input
      },
      refetchQueries: [{
        query: getCampaignsQuery,
        variables: {user: auth.getEmail()}
      }]
    })
    this.setState({
      title: '',
      description: ''
    })
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
            <form id="add-campaign" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" onChange={this.handleChange} value={title}/>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" onChange={this.handleChange} value={description}/>
            <button>Create Campaign</button>
            </form>
          </div>
    )
  }
}

export default graphql(addCampaignMutation)(AddCampaign)
