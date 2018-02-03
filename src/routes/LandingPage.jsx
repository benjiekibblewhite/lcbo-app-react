import React from 'react';
import AddressForm from '../components/AddressForm';

import './LandingPage.scss';


export default class LandingPage extends React.Component {
    constructor(props){
        super(props)

        this.passFormDataToApp = this.passFormDataToApp.bind(this);

        this.state = {
            streetAddress: '',
            city: '',
        }
    }
    passFormDataToApp(streetAddress, city) {
        this.props.handleAddressFormSubmit(streetAddress, city);
        this.props.history.push('search')
    }

    render() {
        return (
            <div className="form_wrapper">
                <h1 className="landing-page_header">Boozehound</h1>
                <p className="landing-page_description">Boozehound helps you find LCBO stores close to you that have your favourite products in stock. No more trudging through the snow to find that your local doesn't have what you were looking for!</p>
                <AddressForm onSubmit={this.passFormDataToApp} />
            </div>
        );
    }
}
