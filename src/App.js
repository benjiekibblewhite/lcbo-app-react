import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './Header/Header';

import LandingPage from './routes/LandingPage';
import Search from './routes/Search';
import ProductResults from './routes/ProductResults';
import StoreResults from './routes/StoreResults';
import Address from './routes/Address';

import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleAddressFormSubmit = this
      .handleAddressFormSubmit
      .bind(this);

    this.handleSearchFormSubmit = this
      .handleSearchFormSubmit
      .bind(this);

    this.state = {
      searchQuery: '',
      userAddress: ''
    };
  }

  handleAddressFormSubmit(streetAddress, city) {
    this.setState({userAddress: `${streetAddress}, ${city}`})
  }

  handleSearchFormSubmit(searchQuery) {
    this.setState({searchQuery: searchQuery})
  }

  render() {
    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return (React.createElement(component, finalProps));
    }
    const PropsRoute = ({
      component,
      ...rest
    }) => {
      return (<Route
        {...rest}
        render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}/>);
    }

    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header
              searchQuery={this.state.searchQuery}
              userAddress={this.state.userAddress}/>
            <Switch>
              <PropsRoute
                exact
                path="/"
                component={LandingPage}
                handleAddressFormSubmit={this.handleAddressFormSubmit}/>
              ]
              <PropsRoute
                path="/update-address"
                component={Address}
                handleAddressFormSubmit={this.handleAddressFormSubmit}/>
              <PropsRoute
                path="/search"
                component={Search}
                handleSearchFormSubmit={this.handleSearchFormSubmit}
                />
              <PropsRoute
                path="/products/:query/:page_num?"
                component={ProductResults}
                userAddress={this.state.userAddress}
                />
              <PropsRoute
                path="/stores/:product_id/:page_num?"
                component={StoreResults}
                userAddress={this.state.userAddress}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
