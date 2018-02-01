import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Card from '../components/Card';
import Loader from 'react-loader-spinner';

import './ProductResults.scss';

export default class ProductResults extends React.Component {
    constructor(props) {
        super(props);

        this.renderResults = this
            .renderResults
            .bind(this);
        this.handleProductCardClick = this
            .handleProductCardClick
            .bind(this);

        this.state = {
            resultsReceived: false,
            searchResults: {},
        }
    }

    componentDidMount() {
        const { page_num, query } = this.props.match.params;
        Axios
            .get(`https://lcboapi.com/products?access_key=${process.env.REACT_APP_API_KEY}&per_page=10&q=${query}&xmlToJSON=false"&page=${page_num ? page_num : '1'}`)
            .then((response) => {
                const returnedSearchResult = response.data;
                this.setState({
                    resultsReceived: true,
                    searchResults: returnedSearchResult,
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    renderResults(searchResults) {
        const productNotFound = searchResults.suggestion;
        if (productNotFound) {
            return `Did you mean ${searchResults.suggestion}`;
        }
        else {
            return (searchResults.result.map((product) => {
                return (
                    <div
                    key={product.id}
                    data-product-id={product.id}
                    
                    className="column is-half">
                    <Link to={`/stores/${product.id}`}>
                    <Card
                        type="product"
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
                        </Link>
                </div>
                );
            }));
        }
    }

    handleProductCardClick(productID) {
        this.props.history.push(`stores/${productID}`);
    }

    render() {
        return (
            <div className="section columns is-multiline">
               { this.state.resultsReceived ?
                    this.renderResults(this.state.searchResults)
                : <div className="centered-block">
                        <p>Loading...</p> 
                        <Loader type="Oval" color="#4a4a4a" height={50} width={50} />
                    </div>
                }
       </div>
        );
    }
}
