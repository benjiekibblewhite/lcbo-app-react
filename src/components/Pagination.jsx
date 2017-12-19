import React from 'react';
import Paginator from 'paginator';


export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.generatePagination = this
            .generatePagination
            .bind(this);
    }

    generatePagination(results) {
        const recordsPerPage = results.records_per_page;
        const paginator = new Paginator(recordsPerPage, 5);
        const paginatorInfo = paginator.build(results.total_record_count, results.current_page)


        console.log(paginatorInfo);
    }

    render() {
        return (
            <div>
                {this.generatePagination(this.props.results)}
            </div>
        )
    }
}
