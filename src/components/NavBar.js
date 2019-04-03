import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import auth from '../services/Auth'

class NavBar extends Component {

  signOut() {
    auth.signOut()
    this.props.history.replace('/')
  }

  render() {
    const links = (auth.isAuthenticated()) ? (
      <ul className="right">
      <li><Link to="/characters">Characters</Link></li>
      <li><Link to="/campaigns">Campaigns</Link></li>
      <li>
        <label>{auth.getEmail()}</label>
        <button className="btn btn-dark" onClick={() => {this.signOut()}}>Sign Out</button>
      </li>
      </ul>
    ) : (
      <ul className="right">
      <li>
      <button className="btn btn-dark" onClick={auth.signIn}>Sign In</button>
      </li>
      </ul>
    )
    return (
      <nav className="nav-wrapper red darken-3">
        <div className="container">
          <Link className="brand-logo left" to="/">
            RPG Chronicles
          </Link>
          {links}
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
