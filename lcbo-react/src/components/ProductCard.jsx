import React from 'react';

export default class ProductCard extends React.Component {

  render() {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={this.props.image} alt="Product Preview"/>
          </figure>
        </div>
        <div className="card-content">
          <p className="title">{this.props.name}</p>
          <p>${this.props.price.toFixed(2)}</p>
          <p>{this.props.primaryCategory}</p>
          <p>{this.props.secondaryCategory}, {this.props.varietal}</p>
          <p>{this.props.style}</p>
          <p>{this.props.producerName}</p>
          <p>{this.props.packagingType}, {this.props.alcoholContent / 100} % ABV</p>
        </div>
      </div>
    )
  }
}