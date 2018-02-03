import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Card from '../components/Card';
import Loader from 'react-loader-spinner';
import ResultsData from '../components/ResultsData';
import Pagination from '../components/pagination';


import './ProductResults.scss';

export default class ProductResults extends React.Component {
    constructor(props) {
        super(props);

        this.renderCards = this
            .renderCards
            .bind(this);
        this.handleProductCardClick = this
            .handleProductCardClick
            .bind(this);
        this.renderResultsView = this
            .renderResultsView
            .bind(this);
        this.axiosCall = this.axiosCall.bind(this);
        this.state = {
            resultsReceived: false,
            searchResults: {},
        };
    }

    axiosCall(props) {
        const { page_num, query } = props.match.params;
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

    componentDidMount() {
        this.axiosCall(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.axiosCall(nextProps);
        this.forceUpdate()
    }

    renderCards(searchResults) {
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

    renderResultsView(searchResults) {
        const pager = this.state.searchResults.pager;
        return (
            <div className="section">
                <ResultsData
                    left_text={`${searchResults.pager.total_record_count} results returned.`}
                    right_text="Click on product to see stores with item in stock"
                    />
                <div className="columns is-multiline">
                    {this.renderCards(searchResults)}
                </div>
                <Pagination
                    format="center"
                    totalPages={pager.total_pages}
                    pageNumber={pager.current_page}
                    spread={5}
                    query_or_id={this.props.match.params.query}
                    resultType="products"
                />
            </div>
        );
    }

    handleProductCardClick(productID) {
        this.props.history.push(`stores/${productID}`);
    }

    render() {
        return (
            this.state.resultsReceived ?
            this.renderResultsView(this.state.searchResults) :
            <div className="centered-block">
                        <p>Loading...</p>
                        <Loader type="Oval" color="#4a4a4a" height={50} width={50} />
                    </div>
        );
    }
}
