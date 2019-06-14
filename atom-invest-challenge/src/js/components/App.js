import React from "react";
import {
  BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import API from "../../Adapters/API.js";
import UserCardsContainer from "./UserCardsContainer.js";
import Search from "./Search.js";
import DetailsCardsContainer from "./DetailsCardsContainer.js";
import { connect } from "react-redux";
import { FETCH_POSTS, DELETE_POST } from "../constants/action-types.js";



const mapStateToProps = state => {
  return { 
    posts: state.posts,  
  };
};

class App extends React.Component {
  state = {
    usersLoaded: false,
    searchTerm: ""
  };

  componentDidMount() {
    API.getPosts().then(posts => {
      this.props.dispatch({ type: FETCH_POSTS, payload: posts})
      this.setState({ usersLoaded: true })
    });
  }

  filteredData = () => {
    const { searchTerm } = this.state;
    const { posts } = this.props;
    let filteredData = [];
    filteredData = posts.filter(
      user => searchTerm.includes(user.userId) || user.title.includes(searchTerm)
    );
    return filteredData;
  };

  submitSearch = (input) => {
  this.setState({
    searchTerm: input
  })
  }

  handleDelete = (id) => {
    console.log(id)
    this.props.dispatch({ type: DELETE_POST, id})
  }

  getAllWords = () => {
    let allBodies = this.props.posts.map(user => user.body)
    return allBodies
  }

  getWordCount = () => {
    let allWords = this.getAllWords()
    return allWords.flat().join().split(' ').length
  }

  countWords = () => {
    let allWordsArray = this.getAllWords()
    let allWordsString = allWordsArray.flat().join().split(' ')
    let wordCounts = {};
    for(let i = 0; i < allWordsString.length; i++)
    wordCounts[allWordsString[i].toLowerCase()] = (wordCounts[allWordsString[i].toLowerCase()] || 0) + 1
    return wordCounts
  }

  getTop5Words = () => {
    let wordFrequency = this.countWords()
    let wordSort = [];
    for (let word in wordFrequency) {
    wordSort.push([word, wordFrequency[word]]);
    }

    wordSort.sort(function(a, b) {
        return b[1] - a[1];
    });

    return wordSort.slice(0,5)
  }

  render() {
    console.log('App props:', this.props)
    if (this.state.usersLoaded) {
      return (
        <div>
          <Router>
            <Switch>
              <Route
                path="/home"
                component={routerProps => {
                  return (
                    <>
                      <Search
                        {...routerProps}
                        submitSearch={(input) => this.submitSearch(input)}
                        wordCount = {this.getWordCount()}
                        top5Words={this.getTop5Words()}
                      />
                      <UserCardsContainer
                        {...routerProps}
                        userData={this.filteredData()}
                      />
                    </>
                  );
                }}
              />

              <Route
                path="/users/:id"
                component={routerProps => {
                  return (
                    <>
                    <Search
                        {...routerProps}
                        submitSearch={(input) => this.submitSearch(input)}
                        wordCount = {this.getWordCount()}
                        top5Words={this.getTop5Words()}
                      />
                    <DetailsCardsContainer
                      {...routerProps}
                      handleDelete={(id)=>this.handleDelete(id)}
                      selectedUser={this.props.posts.filter(post => post.userId === parseInt(routerProps.match.params.id))}
                    />
                    </>
                  );
                }}
              />
            </Switch>
            <Redirect from="/" to="/home" />
          </Router>
        </div>
      );
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps)(App);
