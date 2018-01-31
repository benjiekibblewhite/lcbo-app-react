import React from 'react';
import { Link } from 'react-router-dom';


const UserAddressDisplay = ({ userAddress }) => {
    return(
        <div className="column has-text-right">
            <p>Your address is set to <strong>{userAddress}</strong></p>
            <p><Link className="header_links" to="/update-address">Would you like to change it?</Link></p>
        </div>
    );
};
export default UserAddressDisplay;
