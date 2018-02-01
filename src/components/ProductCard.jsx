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
      </React.Fragment>
    );
  }
}