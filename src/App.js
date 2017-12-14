import React, {Component} from 'react';
import FlipMove from 'react-flip-move';
import Axios from 'axios';

import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css';
import './App.css';

import Header from './components/Header';
import UserLocationForm from './components/UserLocationForm';
import UserSearchQueryForm from './components/UserSearchQueryForm';
import ProductCard from './components/ProductCard';
import StoreCard from './components/StoreCard';

import storeResults from './data/storetestdata';
import productResults from './data/producttestdata';

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
    this.getStoresWithProduct = this
      .getStoresWithProduct
      .bind(this);
    this.renderProducts = this
      .renderProducts
      .bind(this);
    this.renderStores = this
      .renderStores
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
    this.state = {
      showLocationForm: true,
      showQueryForm: false,
      showProductResults: false,
      showStoreResults: false,
      userLocation: "",
      userSearchQuery: "",
      searchResults: {},
      storeResults: storeResults
    };
  }

  updateuserLocation(userAddress, userCity) {
    const userLocation = `${userAddress}, ${userCity}`;
    this.setState({userLocation: userLocation, showLocationForm: false, showQueryForm: true});
  }

  showLocationForm(e) {
    e.preventDefault();
    console.log('yes');
    this.setState({showLocationForm: true, showQueryForm: false});
  }

  handleSearchFormSubmit(searchQuery) {
    this.setState({userSearchQuery: searchQuery, showProductResults: true, showStoreResults: false});
    this.getSearchResults(searchQuery);
  }

  getSearchResults(searchQuery) {
    // Submit Search Query to LCBO Api using Axios (or fetch?) Store result in state
    // (use productResults for testing)
    // https://lcboapi.com/products?access_key=MDphNjhjOWViOC05MDBiLTExZTctYjA3Mi02YjJjM2VjNGE5OTQ6WHJtUXYwUFRCaGFEMzh3NTVTbzFacnJEc3YyQjg3WmVEMXZN&per_page=10&q=" + searchQuery + "&xmlToJSON=false";
    Axios.get(`https://lcboapi.com/products?access_key=MDphNjhjOWViOC05MDBiLTExZTctYjA3Mi02YjJjM2VjNGE5OTQ6WHJtUXYwUFRCaGFEMzh3NTVTbzFacnJEc3YyQjg3WmVEMXZN&per_page=10&q="${searchQuery}&xmlToJSON=false"`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    const returnedSearchResult = productResults;
    this.setState({searchResults: returnedSearchResult});
  }

  handleProductCardClick(productId) {
    this.getStoresWithProduct(this.state.userLocation, productId)
  }

  getStoresWithProduct(productID) {
    // Submit call to LCBO Api using Axios, get user location directly from state
    // use storeResults for testing
    const returnedStoresWithProduct = storeResults;
    this.setState({storeResults: returnedStoresWithProduct, showProductResults: false, showStoreResults: true});
  }

  handleStoreCardClick(storeAddress, storeCity) {
    const mapURL = `https://www.google.ca/maps/dir/${this.state.userLocation},+ON/${storeAddress},${storeCity},+ON`;
    window.open(mapURL);
  }

  renderProducts(searchResults) {
    return (searchResults.result.map((product) => {
      return (
        <div
          key={product.id}
          onClick={() => {
          this.handleProductCardClick(product.id)
        }}
          className="column is-half">
          <ProductCard
            image={product.image_thumb_url}
            name={product.name}
            price={product.price_in_cents / 100}
            primaryCategory={product.primary_category}
            secondaryCategory={product.secondary_category}
            varietal={product.varietal}
            style={product.style}
            producerName={product.producer_name}
            packagingType={product.package}
            alcoholContent={product.alcohol_content}/>
        </div>
      )
    }))
  }

  renderStores(storeResults) {
    return (storeResults.result.map((store) => {
      return (
        <div
          key={store.id}
          className="column is-half"
          onClick={() => {
          this.handleStoreCardClick(store.address_line_1, store.city)
        }}>
          <StoreCard productUserSearchedFor={storeResults.product.name} //Will always be Strongbow while using testing data
            name={store.name} numberInStock={store.quantity} addressLineOne={store.address_line_1} addressLineTwo={store.address_line_2} city={store.city} telephone={store.telephone}/>
        </div>
      )
    }))
  }

  render() {
    /* Should make location + search forms animate on appear too */
    return (
      <div className="App">
        <Header
          userLocation={this.state.userLocation}
          userSearchQuery={this.state.userSearchQuery}
          showLocationForm={this.showLocationForm}/>
        <FlipMove
          enterAnimation="elevator"
          leaveAnimation="elevator">
          {this.state.showLocationForm
            ? <UserLocationForm updateuserLocation={this.updateuserLocation}/>
            : null}
          {this.state.showQueryForm
            ? <UserSearchQueryForm searchFormSubmit={this.handleSearchFormSubmit}/>
            : null}
        </FlipMove>
        <FlipMove
          staggerDelayBy={50}
          appearAnimation="elevator"
          enterAnimation="elevator"
          leaveAnimation="elevator"
          className="section columns is-multiline">
          {this.state.showProductResults
            ? this.renderProducts(this.state.searchResults)
            : null}
          {this.state.showStoreResults
            ? this.renderStores(this.state.storeResults)
            : null}
        </FlipMove>
      </div>
    );
  }
}

export default App;
