import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import '../styles/App.css';
import NavBar from './NavBar'
import Characters from './Characters'
import Campaigns from './Campaigns'
import Campaign from './Campaign'
import SessionForm from './SessionForm'
import Main from './Main'
import Callback from '../Callback'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import auth from '../services/Auth'

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI + '/graphql',
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: auth.getIdToken(),
      }
    }))
  }
})

class App extends Component {

  async componentDidMount() {
    if(this.props.location.pathname === '/callback') return
    try {
      await auth.silentAuth()
      this.forceUpdate()
    } catch(err) {
      if(err.error === 'login_required') return
      console.log(err.error)
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <NavBar />
          <Route exact path='/' component={ Main } />
          <Route exact path='/characters' component={() => <Characters user={auth.getEmail()} /> } />
          <Route exact path='/campaigns' component={() => <Campaigns user={auth.getEmail()} />} />
          <Route exact path='/campaign/:campaign' component={ Campaign } />
          <Route exact path='/session' component={ SessionForm } />
          <Route exact path='/session/:session' component={ SessionForm } />
          <Route exact path='/callback' component={ Callback } />
        </div>
      </ApolloProvider>
    );
  }
}

export default withRouter(App);
