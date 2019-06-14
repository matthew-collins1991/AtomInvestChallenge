import React from "react"
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import "../../index.css";


export default class UserCard extends React.Component {

getShortenedTitles = (uniqueUserData) => {
    let shortTitles = []
    shortTitles = uniqueUserData.map(user => {
        if(user.title.length > 20) {
            let string = ""
            string = user.title.substring(0,20)+"...";
            return string
        } else { 
            return user.title
        }
    })
    return shortTitles.slice(0,4)
}

  render() {
    const { uniqueUserData } = this.props;
    if (uniqueUserData) {
    return (
        
        <Link to={`/users/${uniqueUserData[0].userId}`}>
        <Card id='userCard' key={uniqueUserData.id}>
        <Image src={process.env.PUBLIC_URL + `/avatars/avatar-${uniqueUserData[0].userId}.png`} wrapped ui={true} />
        <Card.Content>
          <Card.Header>User ID: {uniqueUserData[0].userId}</Card.Header>
          <Card.Meta>
            <span className='date'>Some Titles from this User:</span>
          </Card.Meta>
          <Card.Description>
              <ol>
              {this.getShortenedTitles(uniqueUserData).map( title => {
                  return (
                <li>
                    {title}
                </li>
                  )
            })} 
              </ol>
          </Card.Description>
        </Card.Content>
      </Card>
      </Link>

    )
    } else {
        return null
    }
  }
}