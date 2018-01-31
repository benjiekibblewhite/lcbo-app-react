import React from 'react';
import { Link } from 'react-router-dom';


const SearchTermDisplay = ({ searchQuery }) => {
    return(
        <div className="column">
            <p>You are searching for <strong>{searchQuery}</strong></p>
            <p><Link className="header_links" to="/search">Would you like to search for something else?</Link></p>
        </div>
    );
}
export default SearchTermDisplay;
