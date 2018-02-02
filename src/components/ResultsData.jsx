import React from 'react';

export default class ResultsHeader extends React.Component {
    render() {
        return (
            <div className="level" style={{width: "100%"}}>
                <div className="level-item level-left">
                    <div className="has-text-grey">
                        <p>{this.props.left_text}</p>
                    </div>
                </div>
                <div className="level-item level-right">
                    <div className="level-item has-text-grey">
                        <p>{this.props.right_text}</p>
                    </div>
                </div>
            </div>
        )
    }
}
