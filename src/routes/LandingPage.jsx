import React from 'react';
import LargeTextInput from '../components/LargeTextInput';
import LargeSelect from '../components/LargeSelect';
import ontariocities from '../data/ontariocities.js';

import './LandingPage.scss';
console.log(ontariocities)

export default class LandingPage extends React.Component {
    
    render() {
        return(
            <div className="landing-page_wrapper">
                <LargeSelect 
                    options={ontariocities}
                    class="address_select"                
                />
                <LargeTextInput 
                    class="address_input"
                    placeholder="Enter your street address" 
                    id="address_input"
                />
                <h1>Landing!</h1>
            </div>
            );
    }
}