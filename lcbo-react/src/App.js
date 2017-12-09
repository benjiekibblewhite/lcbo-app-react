import React, { Component } from 'react';

import './App.css';

import Header from './components/Header';
import UserLocationForm from './components/UserLocationForm';

class App extends Component {

  constructor(props) {
    super(props);

    this.updateuserLocation = this.updateuserLocation.bind(this);

    this.state = {
      userLocation: "",
    }

  }

updateuserLocation(userAddress, userCity) {
  console.log("yes");
  const userLocation = `${userAddress}, ${userCity}`;
  this.setState({
    userLocation: userLocation,
  })
}

  render() {
    return (
      <div className="App">
        <Header />
        <UserLocationForm
          updateuserLocation = {this.updateuserLocation}
        />
      </div>
    );
  }
}

export default App;
