import React from 'react';
import './LargeSelect.scss';

export default class LargeSelect extends React.Component {
    render() {
        const renderOptions = options => options.map((option, index) => {
            return <option key={index} value={option}>{option}</option>;
        });
        return (
            <div className="field">
                 <div className="control has-text-centered">
                    <div className={`${this.props.class} select largeselect`}>
                       <select onChange={this.props.onChange}>
                            {renderOptions(this.props.options)}
                       </select>
                   </div>
               </div>
           </div>

        );
    }
}
