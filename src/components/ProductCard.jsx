import React from 'react';

export default class ProductCard extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className="media-left">
          <figure className="image">
            <img style={{height: '128px',  width: 'auto'}} src={this.props.image} alt="Product Preview"/>
          </figure>
        </div>
        <div className="media-content">
          <h3 className="title is-5">{this.props.name}</h3>
          <p className="card_details">{this.props.primaryCategory}</p>
          <p className="card_details">{this.props.secondaryCategory}, {this.props.varietal}</p>
          <p className="card_details">{this.props.style}</p>
          <p className="card_details">{this.props.producerName}</p>
          <p className="card_details">{this.props.packagingType}, {this.props.alcoholContent / 100}
            % ABV</p>

        </div>
        <div className="media-right">
          <p className="card_price">${this
              .props
              .price
              .toFixed(2)}</p>
        </div>
      </React.Fragment>
    );
  }
}
