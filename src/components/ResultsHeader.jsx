import React from 'react';

export default class ResultsHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackToResultsClick = this
            .handleBackToResultsClick
            .bind(this);
        this.renderSearchResultsHeaderLeft = this
            .renderSearchResultsHeaderLeft
            .bind(this);
        this.renderStoreResultsHeaderLeft = this
            .renderStoreResultsHeaderLeft
            .bind(this);
        this.renderSearchResultsHeaderRight = this
            .renderSearchResultsHeaderRight
            .bind(this);
        this.renderStoreResultsHeaderRight = this
            .renderStoreResultsHeaderRight
            .bind(this);
    }
    handleBackToResultsClick() {
        this
            .props
            .backToSearchResults();
    }

    renderSearchResultsHeaderLeft() {
        return (
            <div>
                <p className="heading">Showing Results for {this.props.query}</p>
                <p className="title">{this.props.resultsReturned} results returned</p>
            </div>
        )
    }

    renderStoreResultsHeaderLeft() {
        return (
            <div>
                <p className="heading">Showing Stores with {this.props.query} in stock</p>
                <p className="title">Sorted by closest to your location</p>
            </div>
        )
    }

    renderSearchResultsHeaderRight(){
        <div>
            <p className="heading">Click on product to see stores with item in stock</p>
        </div>
    }

    renderStoreResultsHeaderRight(){
        <div>
            <p className="heading">Click on store to see  a map with directions in a new window</p>
        </div>
    }
    render() {
        return (
            <div className="level">
                <div className="level-left">
                    <div className="level-item has-text-centered">
                        {this.props.showingSearchResults
                            ? this.renderSearchResultsHeaderLeft()
                            : this.renderStoreResultsHeaderLeft() }
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item has-text-centered">
                    {this.props.showingSearchResults
                            ? this.renderSearchResultsHeaderRight()
                            : this.renderStoreResultsHeaderRight() }
                    </div>
                </div>
            </div>
        )
    }
}