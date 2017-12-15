import React from 'react';

export default class ProductResultsHeader extends React.Component {

    render() {
        return (
            <div className="level" style={{
                width: "100%"
            }}>
                <div className="level-item level-left">
                    <div>
                        <p className="has-text-grey">Showing Stores with
                            <strong>&nbsp;{this.props.productName}&nbsp;</strong>
                            in stock</p>
                        <p className="has-text-grey">
                            <a onClick={this.props.handleBackToSearchResultsClick}>Go back to search results</a>
                        </p>
                    </div>
                </div>
                <div className="level-item level-right">
                    <div>
                        <p className="has-text-grey">Sorted by closest to your location</p>
                        <p className="has-text-grey">Click on store to see a map with directions in a new window</p>
                    </div>
                </div>
            </div>
        )
    }

}