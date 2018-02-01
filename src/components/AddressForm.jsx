import React from 'react';
import LargeTextInput from './LargeTextInput';
import LargeSelect from './LargeSelect';
import LargeButton from './LargeButton';
import ontariocities from '../data/ontariocities.js';

import './AddressForm.scss';

export default class AddressForm extends React.Component {
    constructor(props){
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.state = {
            streetAddress: '',
            city: 'Toronto',
        }
    }

    handleInputChange(event){
        this.setState({
            streetAddress: event.target.value,
        })
    }

    handleSelectChange(event){
        this.setState( {
            city: event.target.value,
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.streetAddress, this.state.city);
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                    <LargeTextInput
                        class="address_input"
                        placeholder="Enter your street address"
                        id="address_input"
                        onChange={this.handleInputChange}
                    />
                    <LargeSelect
                        options={ontariocities}
                        class="address_select"
                        onChange={this.handleSelectChange}
                    />
                    <LargeButton
                        type="submit"
                        class="address_submit"
                        text="Submit"
                    />
                    </form>
            );
    }
}
