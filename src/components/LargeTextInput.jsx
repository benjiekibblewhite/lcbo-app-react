import React from 'react';
import './LargeTextInput.scss';

export default class LargeTextInput extends React.Component {

    render() {
        return (
            <div className="field">
                 <div className="control">
                   <input 
                    type="text" 
                    className={`centered-block largetextinput ${this.props.class}`} 
                    placeholder={this.props.placeholder} 
                    id={this.props.id} 
                    onChange={this.props.handleChange} 
                    />
                </div>
            </div>
        );
    }
}
