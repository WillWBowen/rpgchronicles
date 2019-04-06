import React, { Component } from 'react'
import { Query, graphql } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import { getCharacterQuery, getCharactersQuery, deleteCharacterMutation } from '../queries'
import auth from '../services/Auth'

class Character extends Component {
  state = {
    openDeleteDialog: false
  }

  handleClick = () => {
    this.setState({openDeleteDialog: true})
  }

  handleClose = () => {
    this.setState({openDeleteDialog: false})
  }

  deleteCharacter = (id) => {
    this.props.mutate({
      variables: {
        character: id,
      },
      refetchQueries: [{
        query: getCharactersQuery,
        variables: {user: auth.getEmail()}
      }]
    }).then(() => {
      this.props.history.push(`/characters`)
    })
  }

  render() {
    const { character } = this.props.match.params
    return (
      <div>
        <Query query={getCharacterQuery} variables={{ character }}>
          {({loading, error, data}) => {
            if(loading) return "Loading..."
            if(error) return `Error! ${error.message}`
            return (
              <div>
                <div className="card">
                  <div className="card-content">
                    <h3>{data.character.name}</h3>
                    <p>{data.character.race}</p>
                    <p>{data.character.class}</p>
                    <Button variant="contained" color="secondary" onClick={this.handleClick}>
                      Delete Character
                    </Button>
                    <Dialog open={this.state.openDeleteDialog} onClose={this.handleClose}>
                      <DialogTitle>{"Delete Character"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Are you sure? you want to delete {data.character.name}? This action cannot be reversed.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={() => {this.deleteCharacter(data.character.id)}} color="secondary">
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>)
          }}
        </Query>
      </div>
    )
  }
}

export default graphql(deleteCharacterMutation)(Character)
