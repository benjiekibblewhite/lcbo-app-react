import React from 'react';
import Paginator from 'paginator';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.generatePaginationArray = this
            .generatePaginationArray
            .bind(this);

        this.state = {
            //rename pagesToRender
            paginationArray: []
        };
    }

    componentWillMount() {
        const recordsPerPage = this.props.results.records_per_page;
        const paginator = new Paginator(recordsPerPage, 3);
        const paginatorInfo = paginator.build(this.props.results.total_record_count, this.props.results.current_page);
        console.log(paginatorInfo);

        const paginationArray = [];
        //add first few pages to the array.
        let page = paginatorInfo.first_page;
        for (page = paginatorInfo.first_page; page <= paginatorInfo.last_page; page++) {
            paginationArray.push({
                pageNumber: page,
                isCurrent: page === paginationArray.current_page
            });
        }
        const onFirstPage = paginatorInfo.current_page === 1;
        const morePagesAvailable = paginatorInfo.last_page !== paginatorInfo.total_pages;
        const shouldAddExtraPage = onFirstPage && morePagesAvailable;
        const firstPageIsNotShown = paginatorInfo.first_page !== 1;
        if (shouldAddExtraPage) {
            paginationArray.push({
                pageNumber: paginatorInfo.last_page + 1,
                isCurrent: false
            });
        }
        if (morePagesAvailable) {
            paginationArray.push({
                pageNumber: paginatorInfo.total_pages,
                isCurrent: false,
            });
        }
        if (firstPageIsNotShown) {
            paginationArray.unshift({
                pageNumber: 1,
                isCurrent: false,
            });
        }

        //if paginationArray length >4, add ellipsis
        this.setState({paginationArray: paginationArray});
    }

    generatePaginationArray() {}

    render() {
        return (
            <nav
                style={{
                width: "100%"
            }}
                className="pagination is-centered"
                role="navigation"
                aria-label="pagination">
                {this.generatePaginationArray(this.props.results)}
                <a className="pagination-previous">Previous</a>
                <a className="pagination-next">Next page</a>
                <ul className="pagination-list">
                    <li>
                        <a className="pagination-link" aria-label="Goto page 1">1</a>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a className="pagination-link" aria-label="Goto page 45">45</a>
                    </li>
                    <li>
                        <a
                            className="pagination-link is-current"
                            aria-label="Page 46"
                            aria-current="page">46</a>
                    </li>
                    <li>
                        <a className="pagination-link" aria-label="Goto page 47">47</a>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a className="pagination-link" aria-label="Goto page 86">86</a>
                    </li>
                </ul>
            </nav>
        )
    }
}