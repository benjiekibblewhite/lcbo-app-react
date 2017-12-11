import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <section className="hero is-primary">
                <div className="hero-body columns">
                    <div className="container column">
                        <h1 className="title">
                            BoozeHound
                        </h1>
                        <h2 className="subtitle">A basic LCBO Search App</h2>
                    </div>
                </div>
            </section>
        )
    }
}