import React from 'react';
import './LargeButton.scss';

export default class LargeButton extends React.Component {
    render() {
        return (
            <div className="field">
                 <div className="control  has-text-centered">
                    <button type={this.props.type} className={`largebutton ${this.props.class}`}>
                        {this.props.text}
                    </button>
                </div>
            </div>
        );
    }
}
