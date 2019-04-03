import React, { Component } from 'react'
import auth from '../services/Auth'

class Main extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to RPG Chronicles</h1>
        {(auth.isAuthenticated()) ? (<p>Select a page in the NavBar</p>) : (<p>Please sign in</p>)}
      </div>
    )
  }
}

export default Main
