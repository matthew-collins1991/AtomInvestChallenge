import React from "react"
import { Grid, Card } from 'semantic-ui-react'
import UserCard from './UserCard.js'


export default class UserCardsContainer extends React.Component {

  state = {
    userData: []
  }

getUniqueUsers = (userData) => {
  let userIdsArray = []
  userIdsArray = userData.map(user => user.userId)
  const uniqueUsers = [...new Set(userIdsArray)]
  return uniqueUsers
}

componentDidMount(){
  this.setState({
    userData: this.props.userData
  })
}

  render() {
    return (
      <div>
        <Grid container >
          <Grid.Row column={4}>
        <Card.Group centered >
          {this.getUniqueUsers(this.state.userData).map(
            user => <UserCard key={user.id} userData = {this.state.userData} uniqueUser={user} />
          )}
        </Card.Group>
        </Grid.Row>
        </Grid>
      </div>
      
    )
  }
}