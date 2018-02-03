import React from 'react';
import mapIcon from '../img/map-icon.png'
export default class StoreCard extends React.Component {

    render() {
        /* Testing note: productUserSearchedFor will always be strongbow cider, until getting actual data */
        return (
            <div className="card media">
                <div className="media-content">
                    <h3 className="title is-6">{this.props.name}</h3>
                    <p>Number of {this.props.productUserSearchedFor} in Stock: <strong>{this.props.numberInStock}</strong></p>
                    <p>{this.props.addressLineOne}</p>
                    <p>{this.props.addressLineTwo}</p>
                    <p>{this.props.city}</p>
                    <p>{this.props.telephone}</p>
                </div>
                <div className="media-right">
                    <figure className="image is-128x128">
                        <img alt="Click to see map to store" src={mapIcon} />
                    </figure>
                </div>
            </div>
        )
    }

}