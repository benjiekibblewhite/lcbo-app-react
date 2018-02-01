import React from 'react';
import LargeTextInput from '../components/LargeTextInput';
import LargeButton from '../components/LargeButton';

import './Search.scss';

export default class Search extends React.Component {
    constructor(props){
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.state = {
            searchQuery: '',
        }
    }

    handleInputChange(event){
        this.setState({
            searchQuery: event.target.value,
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.props.handleSearchFormSubmit(this.state.searchQuery);
        this.props.history.push(`products/${this.state.searchQuery}`)
    }

    render() {
        return (
            <div className="form_wrapper">
                <form onSubmit={this.handleFormSubmit}>
                <LargeTextInput
                    className="search_input"
                    placeholder="What are you looking for?"
                    id="search"
                    onChange={this.handleInputChange}/>
                <LargeButton text="Search" type="submit"/>
                </form>
            </div>
        );
    }
}
