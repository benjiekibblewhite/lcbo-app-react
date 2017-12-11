import React, {Component} from 'react';

import 'bulma/css/bulma.css';

import Header from './components/Header';
import UserLocationForm from './components/UserLocationForm';
import UserSearchQueryForm from './components/UserSearchQueryForm';

import storeResults from './data/storetestdata';
import productResults from './data/producttestdata';

class App extends Component {

  constructor(props) {
    super(props);

    this.updateuserLocation = this
      .updateuserLocation
      .bind(this);
    this.handleSearchFormSubmit = this
      .handleSearchFormSubmit
      .bind(this);
    this.state = {
      showLocationForm: true,
      showQueryForm: false,
      userLocation: "",
      userSearchQuery: ""
    };
  }

  updateuserLocation(userAddress, userCity) {
    const userLocation = `${userAddress}, ${userCity}`;
    this.setState({
      userLocation: userLocation,
      showLocationForm: false,
      showQueryForm: true,
    });
  }

  handleSearchFormSubmit(searchQuery) {
    console.log(productResults);
    this.setState({userSearchQuery: searchQuery});
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <section className="section">
          <div className="columns">
            <div className="column">
              {this.state.userLocation.length > 0 ? <h3>Your address is set to <strong>{this.state.userLocation}</strong></h3> : null }
            </div>
            <div className="column">
            {this.state.userSearchQuery.length > 0 ?<h3>You are searching for <strong>{this.state.userSearchQuery}</strong></h3> : null }
            </div>
          </div>
        </section>
        {this.state.showLocationForm ? <UserLocationForm updateuserLocation={this.updateuserLocation}/> : null }
        {this.state.showQueryForm ? <UserSearchQueryForm searchFormSubmit={this.handleSearchFormSubmit}/> : null}
      </div>
    );
  }
}

export default App;
