import React from "react"
import DetailCard from './DetailCard.js'

export default class DetailsCardsContainer extends React.Component {

  render() {
    const { selectedUser } = this.props;
    if(selectedUser){
    return (
      <div>
          <DetailCard selectedUserData={selectedUser} handleDelete={(id)=>this.props.handleDelete(id)}/>
      </div> 
    )
    }else{
      return null
    }
  }
}