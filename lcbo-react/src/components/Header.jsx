import React from 'react';

export default class Header extends React.Component {
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
                                    ? <h3>Your address is set to <strong>{this.props.userLocation}</strong>
                                        </h3>
                                    : null}
                            </div>
                            <div className="column">
                                {this.props.userSearchQuery.length > 0
                                    ? <h3>You are searching for <strong>{this.props.userSearchQuery}</strong>
                                        </h3>
                                    : null}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )
    }
}