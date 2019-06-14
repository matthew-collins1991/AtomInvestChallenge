import React from "react"
import { Grid, Card } from 'semantic-ui-react'
import UserCard from './UserCard.js'
import { connect } from "react-redux";

export default class UserCardsContainer extends React.Component {



getUniqueUsers = (userData) => {
  let userIdsArray = []
  userIdsArray = userData.map(user => user.userId)
  const uniqueUsers = [...new Set(userIdsArray)]
  return uniqueUsers
}

getUniqueUserData = (id) => {
  return this.props.userData.filter(user => user.userId === id)
}

  render() {
    return (
      <div>
        <Grid container >
          <Grid.Row column={4}>
        <Card.Group centered >
          {this.getUniqueUsers(this.props.userData).map(
            user => <UserCard key={user} uniqueUserData={this.getUniqueUserData(user)} />
          )}
        </Card.Group>
        </Grid.Row>
        </Grid>
      </div>
      
    )
  }
}