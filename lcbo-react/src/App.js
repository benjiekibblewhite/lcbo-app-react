import React, { Component } from 'react';

import './App.css';

import Header from './components/Header';
import UserLocationForm from './components/UserLocationForm';
import UserSearchQueryForm from './components/UserSearchQueryForm';

class App extends Component {

  constructor(props) {
    super(props);

    this.updateuserLocation = this.updateuserLocation.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.state = {
      userLocation: "",
      userSearchQuery: "",
    }
  }

updateuserLocation(userAddress, userCity) {
  console.log("yes");
  const userLocation = `${userAddress}, ${userCity}`;
  this.setState({
    userLocation: userLocation,
  })
}

handleSearchFormSubmit(searchQuery) {
  console.log("yes");
  this.setState({
    userSearchQuery: searchQuery,
  })
}

  render() {
    return (
      <div className="App">
        <Header />
        <section className="section">
        <div className="columns">
          <div classname="column is-one-half">
            <h3>Your address is set to {this.state.userLocation}</h3>
          </div>
          <div classname="column is-one-half">
            <h3>You are searching for {this.state.userSearchQuery}</h3>
          </div>
        </div>
        </section>
        <UserLocationForm
          updateuserLocation = {this.updateuserLocation}
        />
        <UserSearchQueryForm
          searchFormSubmit = {this.handleSearchFormSubmit}
        />
      </div>
    );
  }
}

export default App;
