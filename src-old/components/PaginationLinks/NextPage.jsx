import React from 'react';

export default class extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.isNextPageAvailable
                    ? <a className="pagination-next" data-page-number={this.props.nextPageNumber}>Next page</a>
                    : <a className="pagination-next" disabled>Next page</a>}
            </React.Fragment>
        )
    }
}