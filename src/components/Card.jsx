import React from 'react';
import ProductCard from './ProductCard';
import StoreCard from './StoreCard';


import './Card.scss';

export default class Card extends React.Component {

  render() {
    return (
      <div className="media card">
        { this.props.type === 'product' ? 
        <ProductCard {...this.props}/>
        : <StoreCard {...this.props}/> }
      </div>
    )
  }
}