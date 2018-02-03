import React from 'react';
import AddressForm from '../components/AddressForm';

export default class Address extends React.Component {
    constructor(props) {
        super(props)
        this.passFormDataToApp = this
            .passFormDataToApp
            .bind(this);

    }

    passFormDataToApp(streetAddress, city) {
        this
            .props
            .handleAddressFormSubmit(streetAddress, city);
        this
            .props
            .history
            .goBack();
    }

    render() {
        return (
            <div className="form_wrapper">
                <AddressForm onSubmit={this.passFormDataToApp}/>
            </div>
        )
    }
}
