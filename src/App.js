import React, {Component} from 'react';
import FlipMove from 'react-flip-move';
import Axios from 'axios';

import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css';
import './App.css';

import Header from './components/Header';
import UserLocationForm from './components/UserLocationForm';
import UserSearchQueryForm from './components/UserSearchQueryForm';
import Results from './components/Results';
import Pagination from './components/Pagination';


class App extends Component {

  constructor(props) {
    super(props);

    this.updateuserLocation = this
      .updateuserLocation
      .bind(this);
    this.showLocationForm = this
      .showLocationForm
      .bind(this);
    this.getSearchResults = this
      .getSearchResults
      .bind(this);
    this.showSearchResults = this
      .showSearchResults
      .bind(this);
    this.getStoresWithProduct = this
      .getStoresWithProduct
      .bind(this);
    this.showStoreResults = this
      .showStoreResults
      .bind(this);
    this.handleSearchFormSubmit = this
      .handleSearchFormSubmit
      .bind(this);
    this.handleProductCardClick = this
      .handleProductCardClick
      .bind(this);
    this.handleStoreCardClick = this
      .handleStoreCardClick
      .bind(this);
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
    this.state = {
      showLocationForm: true,
      showQueryForm: false,
      productResultsVisible: false,
      storeResultsVisible: false,
      userLocation: "",
      userSearchQuery: "",
      searchResults: {},
      storeResults: {}
    };
  }

  updateuserLocation(userAddress, userCity) {
    const userLocation = `${userAddress}, ${userCity}`;
    this.setState({userLocation: userLocation, showLocationForm: false, showQueryForm: true});
  }

  showLocationForm(e) {
    e.preventDefault();
    this.setState({showLocationForm: true, showQueryForm: false});
  }
  // change this and getStoreResults. Have functions that instead generate URLs,
  // and have a single function that makes the Axios call

  getSearchResults(searchQuery, pageNumber) {
    Axios
      .get(`https://lcboapi.com/products?access_key=MDpmZTkxZWU2NC1mNDkzLTExZTctYjMzYi1kYjBkYWI3YzM0Yzc6dnRwQWtpRU5YenFERUt0SUUxQjdkTGFtWDQxcTdrdVVwRjFn&per_page=10&q="${searchQuery}&xmlToJSON=false"&page=${pageNumber}`)
      .then((response) => {
        const returnedSearchResult = response.data;
        this.setState({searchResults: returnedSearchResult});
        this.showSearchResults();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showSearchResults() {
    this.setState({productResultsVisible: true, storeResultsVisible: false});
  }

  handleSearchFormSubmit(searchQuery) {
    this.setState({userSearchQuery: searchQuery});
    this.getSearchResults(searchQuery, 1);
  }

  handleProductCardClick(productId) {
    this.getStoresWithProduct(productId, 1);
  }

  getStoresWithProduct(productID, pageNumber) {
    Axios
      .get(`https://lcboapi.com/stores?access_key=MDpmZTkxZWU2NC1mNDkzLTExZTctYjMzYi1kYjBkYWI3YzM0Yzc6dnRwQWtpRU5YenFERUt0SUUxQjdkTGFtWDQxcTdrdVVwRjFn&geo=${this.state.userLocation}&product_id=${productID}&page=${pageNumber}`)
      .then((response) => {
        const returnedStoreResult = response.data;
        this.setState({storeResults: returnedStoreResult});
        this.showStoreResults();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showStoreResults() {
    this.setState({productResultsVisible: false, storeResultsVisible: true});
  }

  handleStoreCardClick(storeAddress, storeCity) {
    const mapURL = `https://www.google.ca/maps/dir/${this.state.userLocation},+ON/${storeAddress},${storeCity},+ON`;
    window.open(mapURL);
  }

  handlePageClick(pageNumber, type) {
    if (type === "prod") {
      this.getSearchResults(this.state.userSearchQuery, pageNumber)
    } else if (type === "store") {
      this.getStoresWithProduct(this.state.storeResults.product.id, pageNumber);
    }
  }

  render() {
    /* Should make location + search forms animate on appear too */
    return (
      <div className="App">
        <Header
          userLocation={this.state.userLocation}
          userSearchQuery={this.state.userSearchQuery}
          showLocationForm={this.showLocationForm}/>
        <FlipMove enterAnimation="accordionVertical" leaveAnimation="accordionVertical">
          {this.state.showLocationForm
            ? <UserLocationForm updateuserLocation={this.updateuserLocation}/>
            : null}
          {this.state.showQueryForm
            ? <UserSearchQueryForm searchFormSubmit={this.handleSearchFormSubmit}/>
            : null}
        </FlipMove>
        {this.state.productResultsVisible || this.state.storeResultsVisible
          ? <Results
              searchQuery={this.state.userSearchQuery}
              searchResults={this.state.searchResults}
              storeResults={this.state.storeResults}
              handleProductCardClick={this.handleProductCardClick}
              handleStoreCardClick={this.handleStoreCardClick}
              productResultsVisible={this.state.productResultsVisible}
              storeResultsVisible={this.state.storeResultsVisible}
              showSearchResults={this.showSearchResults}
              showStoreResults={this.showStoreResults}/>
          : null}
        {this.state.productResultsVisible
          ? <Pagination
              results={this.state.searchResults.pager}
              handlePageClick={this.handlePageClick}
              type="prod"
              />
          : null}
        {this.state.storeResultsVisible
          ? <Pagination
              results={this.state.storeResults.pager}
              handlePageClick={this.handlePageClick}
              type="store"/>
          : null}
      </div>
    );
  }
}

export default App;
