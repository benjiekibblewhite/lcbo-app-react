import React, {Component} from 'react';
import FlipMove from 'react-flip-move';

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

  handleSearchFormSubmit(searchQuery) {
    this.setState({userSearchQuery: searchQuery, showProductResults: true});
    this.getSearchResults(searchQuery);
  }

  getSearchResults(searchQuery) {
    // Submit Search Query to LCBO Api using Axios (or fetch?) Store result in state
    // (use productResults for testing)
    const returnedSearchResult = productResults;
    this.setState({searchResults: returnedSearchResult});
  }

  handleProductCardClick(productId) {
    this.getStoresWithProduct(this.state.userLocation, productId)
  }

  getStoresWithProduct(productID) {
    // Submit call to LCBO Api using Axios, get user location directly from state use
    // storeResults for testing
    const returnedStoresWithProduct = storeResults;
    this.setState({storeResults: returnedStoresWithProduct, showProductResults: false, showStoreResults: true});
  }

  renderProducts(searchResults) {
    return (searchResults.result.map((product) => {
      return (
        <div
          key={product.id}
          data-product-id={product.id}
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
        <div key={store.id} className="column is-one-fifth">
          <StoreCard
            name={store.name}
            numberInStock={store.quantity}
            addressLineOne={store.address_line_1}
            addressLineTwo={store.address_line_2}
            city={store.city}
            telephone={store.telephone}/>
        </div>
      )
    }))
  }

  render() {
    /* Should make location + search forms animate on appear too */
    return (
      <div className="App">
      <i class="fa fa-search" aria-hidden="true"></i>
        <Header
          userLocation={this.state.userLocation}
          userSearchQuery={this.state.userSearchQuery}/> {this.state.showLocationForm
          ? <UserLocationForm updateuserLocation={this.updateuserLocation}/>
          : null}
        {this.state.showQueryForm
          ? <UserSearchQueryForm searchFormSubmit={this.handleSearchFormSubmit}/>
          : null}
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
