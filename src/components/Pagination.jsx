import React from 'react';
import Paginator from 'paginator';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.generatePaginationArray = this
            .generatePaginationArray
            .bind(this);
        this.renderPagination = this
            .renderPagination
            .bind(this);

        this.state = {
            //rename pagesToRender
            paginationArray: []
        };
    }

    componentDidMount() {
        this.generatePaginationArray();
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps !== this.props) {
            this.generatePaginationArray();
        }
    }

    generatePaginationArray() {
        const recordsPerPage = this.props.results.records_per_page;
        const paginator = new Paginator(recordsPerPage, 3);
        const paginatorInfo = paginator.build(this.props.results.total_record_count, this.props.results.current_page);
        const paginationArray = [];
        //add first few pages to the array.
        let page = paginatorInfo.first_page;
        for (page = paginatorInfo.first_page; page <= paginatorInfo.last_page; page++) {
            paginationArray.push({
                type: "page",
                pageNumber: page,
                isCurrent: page === paginatorInfo.current_page
            });
        }
        const onSecondPage = paginatorInfo.current_page === 2;
        const morePagesAvailable = paginatorInfo.last_page !== paginatorInfo.total_pages;
        const totalPagesHigherThanPageToBeAdded = paginatorInfo.last_page !== paginatorInfo.total_pages - 1;
        const shouldAddExtraPage = onSecondPage && morePagesAvailable && totalPagesHigherThanPageToBeAdded;
        const firstPageIsNotShown = paginatorInfo.first_page !== 1;
        if (shouldAddExtraPage) {
            //add it
            paginationArray.push({
                type: "page",
                pageNumber: paginatorInfo.last_page + 1,
                isCurrent: false
            });
        }
        if (morePagesAvailable) {
            //add last page
            paginationArray.push({type: "page", pageNumber: paginatorInfo.total_pages, isCurrent: false});
        }
        if (firstPageIsNotShown) {
            //show it
            paginationArray.unshift({type: "page", pageNumber: 1, isCurrent: false});
        }
        //Add ellipsis, to show if there is a jump in numbers
        const ellipsis = {
            type: "ellipsis"
        };

        const notOnFirstPage = paginatorInfo.current_page !== 1;
        const lastPageIsNotSecondPage = paginatorInfo.last_page !== 2;
        const shouldAddFirstEllipsis = notOnFirstPage && lastPageIsNotSecondPage && paginationArray.length > 4;

        if (shouldAddFirstEllipsis) {
            paginationArray.splice(1, 0, ellipsis);
        }

        if (morePagesAvailable) {
            //take total length, and reduce, remembering that indexes start at 0
            const secondToLast = paginationArray.length - 1;
            paginationArray.splice(secondToLast, 0, ellipsis);
        }

        this.setState({paginationArray: paginationArray});
    }

    renderPagination() {
        const handleClick = this.props.handlePageClick;
        const type = this.props.type;
        return (this.state.paginationArray.map(function (page, index) {
            if (page.type === "page") {
                const ariaLabel = `GoTo page ${page.pageNumber}`;
                const classes = page.isCurrent
                    ? "pagination-link is-current"
                    : "pagination-link";
                return (
                    <li key={index}>
                        <a
                            className={classes}
                            aria-label={ariaLabel}
                            onClick={() => {
                            handleClick(page.pageNumber, type)
                        }}>{page.pageNumber}</a>
                    </li>
                );
            } else if (page.type === "ellipsis") {
                return (
                    <li key={index}>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                )

            }
        }));
    }

    render() {
        const isPreviousPageAvailable = this.props.results.previous_page !== null;
        const previousPageNumber = this.props.results.current_page - 1;
        const isNextPageAvailable = this.props.results.next_page !== null;
        const nextPageNumber = this.props.results.current_page + 1;
        return (
            <nav
                style={{
                width: "100%"
            }}
                className="pagination is-centered"
                role="navigation"
                aria-label="pagination">
                {isPreviousPageAvailable
                    ? <a
                            className="pagination-previous"
                            onClick={() => {
                            this
                                .props
                                .handlePageClick(previousPageNumber, this.props.type)
                        }}>Previous</a>
                    : <a className="pagination-previous" disabled>Previous</a>}
                {isNextPageAvailable
                    ? <a
                            className="pagination-next"
                            onClick={() => {
                            this
                                .props
                                .handlePageClick(nextPageNumber, this.props.type)
                        }}>Next page</a>
                    : <a className="pagination-next" disabled>Next page</a>}

                <ul className="pagination-list">
                    {this.renderPagination()}
                </ul>
            </nav>
        )
    }
}