import React from 'react';
import FlipMove from 'react-flip-move';

import ProductCard from './ProductCard';
import StoreCard from './StoreCard';
import ProductResultsHeader from './ProductResultsHeader';
import StoreResultsHeader from './StoreResultsHeaader';

export default class Results extends React.Component {
    constructor(props) {
        super(props);

        this.renderProducts = this
            .renderProducts
            .bind(this);
        this.handleProductCardClick = this
            .handleProductCardClick
            .bind(this);
        this.renderStores = this
            .renderStores
            .bind(this);
        this.handleStoreCardClick = this
            .handleStoreCardClick
            .bind(this);
        this.handleBackToSearchResultsClick = this
            .handleBackToSearchResultsClick
            .bind(this);
    }

    renderProducts(searchResults) {
        return (searchResults.result.map((product) => {
            return (
                <div
                    key={product.id}
                    data-product-id={product.id}
                    onClick={() => {
                    this.handleProductCardClick(product.id)
                }}
                    className="column is-half">
                    <ProductCard
                        image={product.image_thumb_url}
                        name={product.name}
                        price={product.price_in_cents / 100}
                        primaryCategory={product.primary_category}
                        secondaryCategory={product.secondary_category}
                        varietal={product.varietal}
                        style={product.style}
                        producerName={product.producer_name}
                        packagingType={product.package}
                        alcoholContent={product.alcohol_content}/>
                </div>
            )
        }))
    }

    handleProductCardClick(productID) {
        this
            .props
            .handleProductCardClick(productID)
    }

    renderStores(storeResults) {
        return (storeResults.result.map((store) => {
            return (
                <div
                    key={store.id}
                    className="column is-half"
                    onClick={() => {
                    this.handleStoreCardClick(store.address_line_1, store.city)
                }}>
                    <StoreCard productUserSearchedFor={storeResults.product.name} //Will always be Strongbow while using testing data
                        name={store.name} numberInStock={store.quantity} addressLineOne={store.address_line_1} addressLineTwo={store.address_line_2} city={store.city} telephone={store.telephone}/>
                </div>
            )
        }))
    }

    handleStoreCardClick(storeAddress, storeCity) {
        this
            .props
            .handleStoreCardClick(storeAddress, storeCity)
    }

    handleBackToSearchResultsClick() {
        this
            .props
            .showSearchResults()
    }

    render() {
        return (
            <FlipMove
                staggerDelayBy={50}
                appearAnimation="elevator"
                enterAnimation="elevator"
                leaveAnimation="elevator"
                className="section columns is-multiline">

                {this.props.productResultsVisible
                    ? <ProductResultsHeader
                            query={this.props.searchQuery}
                            resultsReturned={this.props.searchResults.pager.total_record_count}/>
                    : null}
                {this.props.productResultsVisible
                    ? this.renderProducts(this.props.searchResults)
                    : null}

                {this.props.storeResultsVisible
                    ? <StoreResultsHeader
                            handleBackToSearchResultsClick={this.props.showSearchResults}
                            productName={this.props.storeResults.product.name}/>
                    : null}
                {this.props.storeResultsVisible
                    ? this.renderStores(this.props.storeResults)
                    : null}

            </FlipMove>
        )
    }
}