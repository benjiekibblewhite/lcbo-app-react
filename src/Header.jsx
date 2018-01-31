import React from 'react';
import { Link } from 'react-router-dom';

import SearchTermDisplay from './Header_SearchTermDisplay';
import UserAddressDisplay from './Header_UserAddressDisplay';

import './Header.scss';

export default class Header extends React.Component {

    render() {
        return (
        <header className="hero header">
            <div className="hero-body">
                <Link to="/"><h1 className="logo">Boozehound</h1></Link>
                <div className="info-container columns">
                  {this.props.searchQuery ? <SearchTermDisplay searchQuery={this.props.searchQuery} /> : null }
                  {this.props.userAddress ? <UserAddressDisplay userAddress={this.props.userAddress} /> : null }  
                </div>
            </div>
        </header>
        );
    }
}
