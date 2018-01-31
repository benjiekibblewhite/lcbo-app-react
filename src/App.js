import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';

import LandingPage from './routes/LandingPage';
import Search from './routes/Search';
import AddressForm from './routes/AddressForm';
import ProductResults from './routes/ProductResults';
import StoreResults from './routes/StoreResults';

import './App.scss';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      userAddress: '',
    };
  }

  render() {
      const renderMergedProps = (component, ...rest) => {
        const finalProps = Object.assign({}, ...rest);
        return (
          React.createElement(component, finalProps)
        );
      }
      const PropsRoute = ({ component, ...rest }) => {
        return (
          <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
        );
      }

      return (
          <div>
      <BrowserRouter>
      <div className="container">
        <Header 
        searchQuery={this.state.searchQuery}
        userAddress={this.state.userAddress}
        />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/search" component={Search} />
              <Route path="/update-address" component={AddressForm} />
              <PropsRoute path="/products/:query/:page_num?" component={ProductResults} userAddress={this.state.userAddress} />
              <PropsRoute path="/stores/:product_id/:page_num?" component={StoreResults} userAddress={this.state.userAddress} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
