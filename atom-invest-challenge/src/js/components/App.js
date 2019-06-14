import React from "react";
import {
  BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import API from "../../Adapters/API.js";
import UserCardsContainer from "./UserCardsContainer.js";
import Search from "./Search.js";
import DetailsCardsContainer from "./DetailsCardsContainer.js";

class App extends React.Component {
  state = {
    userData: [],
    usersLoaded: false,
    searchTerm: ""
  };

  componentDidMount() {
    API.getUsers().then(users =>
      this.setState({
        userData: users,
        usersLoaded: true
      })
    );
  }

  filteredData = () => {
    const { userData, searchTerm } = this.state;
    let filteredData = [];
    filteredData = userData.filter(
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
    this.setState({
      userData: this.state.userData.filter(data => data.id !== id)
    })
  }

  getAllWords = () => {
    let allBodies = this.state.userData.map(user => user.body)
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
                      id={routerProps.match.params.id}
                      {...routerProps}
                      userData={this.state.userData}
                      handleDelete={(id)=>this.handleDelete(id)}
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
      return null;
    }
  }
}

export default App;
