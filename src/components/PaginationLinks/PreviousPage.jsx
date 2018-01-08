import React from 'react';

export default class extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.isPreviousPageAvailable
                    ? <a className="pagination-next" data-page-number={this.props.previousPageNumber}>Previous page</a>
                    : <a className="pagination-next" disabled>Previous page</a>}
            </React.Fragment>
        )
    }
}