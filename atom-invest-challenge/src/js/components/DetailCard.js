import React from "react";
import { Item, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom'

export default class DetailCard extends React.Component {
  state = {
    selectedUserData: undefined
  };

  componentDidMount() {
    this.setState({
      selectedUserData: this.props.selectedUser
    });
  }

  render() {
    const { selectedUserData } = this.state;
    if (selectedUserData) {
      return (
        <div id='itemDiv'>
        <Link to='/home'>
        <Button color="blue">Back</Button>
        </Link>
        <Item.Group divided id="detailsContainer">
          {selectedUserData.map(user => {
            return (
              <Item key={user.id}>
                <Item.Image
                  size="small"
                  src={
                    process.env.PUBLIC_URL +
                    `/avatars/avatar-${user.userId}.png`
                  }
                />

                <Item.Content>
                  <Item.Header>{user.title}</Item.Header>
                  <Item.Description>
                    <p>{user.body}</p>
                  </Item.Description>
                  <Item.Extra>
                    <Button 
                    floated="left" 
                    color="red"
                    onClick={() => this.props.handleDelete(user.id)}
                    >Delete
                    </Button>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}{" "}
        </Item.Group>
        </div>
      );
    } else {
      return null;
    }
  }
}
