import React from 'react';
import './LargeSelect.scss';

export default class LargeSelect extends React.Component {
    render() {
        const renderOptions = options => options.map((option, index) => { 
            return <option key={index} value={option}>{option}</option>; 
        });
        return (
            <div className="select largeselect">
               <select>
                    {renderOptions(this.props.options)}
               </select>
           </div>

        );
    }
}
