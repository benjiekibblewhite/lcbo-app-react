import React from 'react';

export default class ProductCard extends React.Component {

  render() {
    return (
      <div className="media card">
        <div className="media-left">
          <figure className="image is-128x128">
            <img style={{height: '100%',  width: 'auto'}} src={this.props.image} alt="Product Preview"/>
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-5">{this.props.name}</p>
          <p>{this.props.primaryCategory}</p>
          <p>{this.props.secondaryCategory}, {this.props.varietal}</p>
          <p>{this.props.style}</p>
          <p>{this.props.producerName}</p>
          <p>{this.props.packagingType}, {this.props.alcoholContent / 100}
            % ABV</p>

        </div>
        <div className="media-right">
          <p>${this
              .props
              .price
              .toFixed(2)}</p>
        </div>
      </div>
    )
  }
}