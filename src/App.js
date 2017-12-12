import React, {Component} from 'react';
import FlipMove from 'react-flip-move';

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
    this.renderProducts = this
      .renderProducts
      .bind(this);
    this.renderStores = this
      .renderStores
      .bind(this);
    this.handleSearchFormSubmit = this
      .handleSearchFormSubmit
      .bind(this);
    this.state = {
      showLocationForm: true,
      showQueryForm: false,
      showProductResults: false,
      showStoreResults: false,
      userLocation: "",
      userSearchQuery: "",
      searchResults: {},
      storeResults: storeResults,
    };
  }

  updateuserLocation(userAddress, userCity) {
    const userLocation = `${userAddress}, ${userCity}`;
    this.setState({userLocation: userLocation, showLocationForm: false, showQueryForm: true});
  }

  getSearchResults(searchQuery) {
    // Submit Search Query to LCBO Api using Axios (or fetch?) Store result in state
    // (use productResults for testing)
    const returnedSearchResult = productResults;
    this.setState({searchResults: returnedSearchResult});
  }

  handleSearchFormSubmit(searchQuery) {
    this.setState({userSearchQuery: searchQuery, showProductResults: true});
    this.getSearchResults(searchQuery);
  }

  renderProducts(searchResults) {
    return (searchResults.result.map((product) => {
      return (
        <div key={product.id} className="column is-one-fifth">
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

  renderStores(storeResults){
    return (storeResults.result.map((store) => {
      return(
        <div key={store.id} className="column is-one-fifth">
          <StoreCard
            name={store.name}
            numberInStock={store.quantity}
            addressLineOne={store.address_line_1}
            addressLineTwo={store.address_line_2}
            city={store.city}
            telephone={store.telephone}
          />
        </div>
      )
    })
    )
  }

  render() {
    return (
      <div className="App">
        <Header
          userLocation={this.state.userLocation}
          userSearchQuery={this.state.userSearchQuery}
        />

        {this.state.showLocationForm
          ? <UserLocationForm updateuserLocation={this.updateuserLocation}/>
          : null}
        {this.state.showQueryForm
          ? <UserSearchQueryForm searchFormSubmit={this.handleSearchFormSubmit}/>
          : null}
        <FlipMove
          staggerDelayBy={50}
          appearAnimation="elevator"
          enterAnimation="eleavator"
          leaveAnimation="elevator"
          className="section columns is-multiline">
          {this.state.showProductResults
            ? this.renderProducts(this.state.searchResults)
            : null}
          {this.state.showStoreResults
          ? this.renderStores(this.state.storeResults)
          : null }
        </FlipMove>
      </div>
    );
  }
}

export default App;
