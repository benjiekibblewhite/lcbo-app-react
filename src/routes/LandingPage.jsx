import React from 'react';
import './LandingPage.scss';

export default class LandingPage extends React.Component {
    
    render() {
        const params = this.props.match.params;

        return(
            <div>
                <h1>Landing!</h1>
            </div>
            );
    }
}