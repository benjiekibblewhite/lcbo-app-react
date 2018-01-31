import React from 'react';
import './LargeTextInput.scss';

export default class LargeTextInput extends React.Component {
    
    render() {
        return(
           <input 
            type="text" 
            className={`largetextinput ${this.props.class}`} 
            placeholder={this.props.placeholder} 
            id={this.props.id} 
            onChange={this.props.handleChange} 
            />
        );
    }
}