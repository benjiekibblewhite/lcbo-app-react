import React from 'react';
import styles from  './ProductResults.scss';

export default class ProductResults extends React.Component {
    
    render() {
        
        const params = this.props.match.params;
        
        return(
            <div className="section">
                <h1>Success! <span className={styles.query}>{params.query}</span></h1>
            </div>
            );
    }
}