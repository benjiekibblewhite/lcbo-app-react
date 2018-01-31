import React from 'react';
import './ProductResults.scss';

export default class ProductResults extends React.Component {
    
    render() {
        
        const params = this.props.match.params
        
        return(
            <div>
                <h1>Success!{params.query}</h1>
            </div>
            );
    }
}