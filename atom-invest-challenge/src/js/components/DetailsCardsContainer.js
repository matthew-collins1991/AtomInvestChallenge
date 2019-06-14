import React from "react"
import DetailCard from './DetailCard.js'


export default class DetailsCardsContainer extends React.Component {

  state = {
    selectedUser: undefined
  }

  componentDidMount(){
    this.setState({
      selectedUser: this.props.userData.filter(user => user.userId === parseInt(this.props.id))
    })
  }

  render() {
    const { selectedUser } = this.state;
    if(selectedUser){
    return (
      <div>

          <DetailCard selectedUser={selectedUser} handleDelete={(id)=>this.props.handleDelete(id)}/>
      </div> 
    )
    }else{
      return null
    }
  }
}