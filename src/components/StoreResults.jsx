import React from 'react';
import FlipMove from 'react-flip-move';

import StoreCard from '../components/StoreCard';

export default class ProductResults extends React.Component {
    constructor(props) {
        super(props)

        this.renderStores = this
            .renderStores
            .bind(this);
        this.handleStoreCardClick = this
            .handleStoreCardClick
            .bind(this);
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

    render() {
        return (
            <FlipMove
            staggerDelayBy={50}
            appearAnimation="elevator"
            enterAnimation="elevator"
            leaveAnimation="elevator"
            className="section columns is-multiline">
                <div
                    className="level"
                    style={{
                    width: "100%"
                }}>
                    <div className="level-item level-left">
                        <div>
                            <p className="has-text-grey">Showing Stores with <strong>{this.props.storeResults.product.name}</strong> in stock</p>
                            <p className="has-text-grey">Sorted by closest to your location</p>
                        </div>
                    </div>
                    <div className="level-item level-right">
                        <div>
                            <p className="has-text-grey">Click on store to see  a map with directions in a new window</p>
                        </div>
                    </div>
                </div>
                {this.renderStores(this.props.storeResults)}
            </FlipMove>
        )
    }
}