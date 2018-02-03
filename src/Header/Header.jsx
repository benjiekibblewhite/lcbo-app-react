import React from 'react';
import { Link } from 'react-router-dom';

import SearchTermDisplay from './Header_SearchTermDisplay';
import UserAddressDisplay from './Header_UserAddressDisplay';

import logo from '../img/dog.svg'

import './Header.scss';

export default class Header extends React.Component {

    render() {
        return (
        <header className="hero header">
            <div className="hero-body">
                <div  className="logo">
                    <img className="logo_img"src={logo} alt="Dog Logo" />
                    <h1 className="logo_text"><Link to="/">Boozehound</Link></h1>
                </div>
                <div className="info-container columns">
                  {this.props.searchQuery ? <SearchTermDisplay searchQuery={this.props.searchQuery} /> : null }
                  {this.props.userAddress ? <UserAddressDisplay userAddress={this.props.userAddress} /> : null }
                </div>
            </div>
        </header>
        );
    }
}
