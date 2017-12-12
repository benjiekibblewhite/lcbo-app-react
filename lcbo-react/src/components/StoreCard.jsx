import React from 'react';

export default class StoreCard extends React.Component {

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h3>{this.props.name}</h3>
                    <p>Number in Stock: {this.props.numberInStock}</p>
                    <p>{this.props.addressLineOne}</p>
                    <p>{this.props.addressLineTwo}</p>
                    <p>{this.props.city}</p>
                    <p>{this.props.telephone}</p>
                </div>
            </div>
        )
    }

}