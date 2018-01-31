import React from 'react';
import './StoreResults.scss';

export default class StoreResults extends React.Component {
    
    render() {
        const params = this.props.match.params
        
        return(
            <div>
                <h1>Products!{params.product_id}</h1>
                <p>{this.props.userAddress}</p>
            </div>
            );
    }
}