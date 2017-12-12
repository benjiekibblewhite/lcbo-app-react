import React from 'react';

export default class UserSearchQueryForm extends React.Component {
    constructor(props) {
        super(props);

        this.updatesearchQuery = this
            .updatesearchQuery
            .bind(this);
        this.handleSearchSubmit = this
            .handleSearchSubmit
            .bind(this);

        this.state = {
            searchQuery: ''
        };
    }

    updatesearchQuery(event) {
        this.setState({searchQuery: event.target.value});
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        this
            .props
            .searchFormSubmit(this.state.searchQuery);
        this.setState({searchQuery: ''});
    }

    render() {
        return (
            <section className="section">
                <div className="field">
                    <form onSubmit={this.handleSearchSubmit}>
                        <label className="label">Search the LCBO</label>
                        <div className="control field is-grouped">
                            <input
                                id="userAddress"
                                className="input"
                                type="text"
                                placeholder="What are you looking for?"
                                value={this.state.searchQuery}
                                onChange={this.updatesearchQuery}/>
                            <button className="button is-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }

}