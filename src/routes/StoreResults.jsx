import React from 'react';
import Axios from 'axios';
import Card from '../components/Card';
import Loader from 'react-loader-spinner';

import './StoreResults.scss';

export default class StoreResults extends React.Component {
    constructor(props) {
        super(props);

        this.renderResults = this
            .renderResults
            .bind(this);
        this.handleStoreCardClick = this
            .handleStoreCardClick
            .bind(this);

        this.state = {
            resultsReceived: false,
            storeResults: {},
        }
    }

    componentDidMount() {
        const { page_num, product_id } = this.props.match.params;
        Axios
            .get(`https://lcboapi.com/stores?access_key=${process.env.REACT_APP_API_KEY}&per_page=10&geo=${this.props.userAddress}&product_id=${product_id}&page=${page_num ? page_num : '1'}`)
            .then((response) => {
                const returnedSearchResult = response.data;
                this.setState({
                    resultsReceived: true,
                    storeResults: returnedSearchResult,
                });
            })
            .catch(function(error) {
                console.log(error);
            });

    }

    renderResults(storeResults) {
        const itemNotInStock = storeResults.result.length === 0;
        if (itemNotInStock) {
            return `No stores have ${storeResults.product.name} in stock.`;
        }
        else {
            return (storeResults.result.map((store) => {
                return (
                    <div
                        key={store.id}
                        className="column is-half"
                        onClick={() => {this.handleStoreCardClick(store.address_line_1, store.city)}}
                    >
                    <Card
                        productUserSearchedFor={storeResults.product.name} 
                        name={store.name} 
                        numberInStock={store.quantity} 
                        addressLineOne={store.address_line_1} 
                        addressLineTwo={store.address_line_2} 
                        city={store.city} 
                        telephone={store.telephone}
                        />
                </div>
                );
            }));
        }
    }

    handleStoreCardClick(storeAddress, storeCity) {
        const mapURL = `https://www.google.ca/maps/dir/${this.props.userAddress},+ON/${storeAddress},${storeCity},+ON`;
        window.open(mapURL);
    }

    render() {
        return (
            <div className="section columns is-multiline">
               { this.state.resultsReceived ?
                    this.renderResults(this.state.storeResults)
                : <div className="centered-block">
                        <p>Loading...</p> 
                        <Loader type="Oval" color="#4a4a4a" height={50} width={50} />
                    </div>
                }
       </div>
        );
    }
}
