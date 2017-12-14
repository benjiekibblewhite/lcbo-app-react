import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.displayUserLocation = this
            .displayUserLocation
            .bind(this);
        this.displayUserSearchQuery = this
            .displayUserSearchQuery
            .bind(this);
    }

    displayUserLocation() {
        return (
            <div>
                <h3>Your address is set to <strong>{this.props.userLocation}</strong></h3>
                <p>
                    <a onClick={this.props.showLocationForm}>Would you like to change it?</a>
                </p>
            </div>
        )
    }

    displayUserSearchQuery(){
        return(
            <h3>You are searching for <strong>{this.props.userSearchQuery}</strong></h3>
        )
    }

    render() {
        return (
            <section className="hero is-dark is-bold">
                <div className="hero-body columns">
                    <div className="container column">
                        <h1 className="title">
                            BoozeHound
                        </h1>
                        <h2 className="subtitle">A basic LCBO Search App</h2>
                        <div className="columns">
                            <div className="column">
                                {this.props.userLocation.length > 0
                                    ? this.displayUserLocation()
                                    : null}
                            </div>
                            <div className="column">
                                {this.props.userSearchQuery.length > 0
                                    ? this.displayUserSearchQuery()
                                    : null}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )
    }
}