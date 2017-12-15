import React from 'react';

export default class ProductResultsHeader extends React.Component {

    render() {
        return (
            <div className="level" style={{
                width: "100%"
            }}>
                <div className="level-item level-left">
                    <div>
                        <p className="has-text-grey">Showing Results for
                        &nbsp;<strong>{this.props.query}</strong>
                        </p>
                        <p className="has-text-grey">
                            <strong>{this.props.resultsReturned}</strong>
                            &nbsp;results returned</p>
                    </div>
                </div>
                <div className="level-item level-right">
                    <div>
                        <p className="has-text-grey">Click on product to see stores with item in stock</p>
                    </div>
                </div>
            </div>
        )
    }

}