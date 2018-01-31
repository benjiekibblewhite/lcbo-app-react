import React from 'react';
import LargeTextInput from '../components/LargeTextInput';
import LargeSelect from '../components/LargeSelect';
import LargeButton from '../components/LargeButton';
import ontariocities from '../data/ontariocities.js';

import './LandingPage.scss';

export default class LandingPage extends React.Component {

    render() {
        return (
            <div className="landing-page_wrapper">
                <h1 className="landing-page_header">Boozehound</h1>
                <p className="landing-page_description">Boozehound helps you find LCBO stores close to you that have your favourite products in stock. No more trudging through the snow to find that your local doesn't have what you were looking for!</p>
                <form>
                    <LargeTextInput 
                        class="address_input"
                        placeholder="Enter your street address" 
                        id="address_input"
                    />
                    <LargeSelect 
                        options={ontariocities}
                        class="address_select"                
                    />
                    <LargeButton
                        type="submit"
                        class="address_submit"
                        text="Submit"
                    />
                    </form>
            </div>
        );
    }
}
