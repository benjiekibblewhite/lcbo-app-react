/**
 * Pagination component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Link
}
from 'react-router-dom'

export const toInteger = (v) => isNaN(v) ? 0 : parseInt(v, 10)

function currentPageClassName(pageNumber, currentPageNumber) {
  if (pageNumber === currentPageNumber) return 'is-current'
}


export function calculateTotalPages(totalItemsInCollection, itemsPerPage) {
  const e = toInteger(totalItemsInCollection)
  const p = toInteger(itemsPerPage)
  const r = !!(e % p)
  const l = Math.floor(e / p)
  return (r) ? l + 1 : l
}

export function calculatePageNumber(pageNumber, totalPages) {
  const p = toInteger(pageNumber)
  const t = toInteger(totalPages)
  return Math.max(1, Math.min(p, t))
}

export default class Pagination extends Component {
  static calculateTotalPages = calculateTotalPages
  static calculatePageNumber = calculatePageNumber

  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages)

  }

  x() {
    return 0
  }

  y() {
    return 0
  }

  z() {
    return 0
  }

  zeroIndex() {
    return 0
  }

  lastIndex() {
    return 0
  }

  pageKey(currentPageKey) {return `pagination-${currentPageKey}`}

  pageLinkPath(path, currentPageNumber) {
    return `${path}/${this.props.resultType}/${this.props.query_or_id}/${currentPageNumber}`
  }

  hasReversePageLink(pageNumber, totalPages) {
    return (this.zeroIndex(pageNumber, totalPages) - 1) > 0
  }

  hasForwardPageLink(pageNumber, totalPages) {
    return (this.lastIndex(pageNumber, totalPages) + 1) < totalPages
  }

  hasZeroPageLink(pageNumber, totalPages) {
    return this.zeroIndex(pageNumber, totalPages) > 0
  }

  hasLastPageLink(pageNumber, totalPages) {
    return this.lastIndex(pageNumber, totalPages) < totalPages
  }

  reversePageLinkItem(path, pageNumber, totalPages) {
      const n = pageNumber - 1
      return (
          <Link disabled= {n < 1 ? true : false }key={this.pageKey('reverse')} className='pagination-previous' to={this.pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='reverse'>
              Previous
            </span>
          </Link>
      )
    }


  forwardPageLinkItem(path, pageNumber, totalPages) {
      const n = pageNumber + 1
      return (
          <Link disabled= {n > totalPages ? true : false } key={this.pageKey('forward')} className='pagination-next' to={this.pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='forwardPage'>
              Next
            </span>
          </Link>
      )
    }

  zeroPageLinkItem(path, pageNumber, totalPages) {
    if (this.hasZeroPageLink(pageNumber, totalPages)) {
      const n = 1
      return (
        <React.Fragment>
          <Link key={this.pageKey(n)}  className='zeroPage pagination-link' aria-label="Goto page 1" to={this.pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='pageNumber'>
              {n}
            </span>
          </Link>
          <span className="pagination-ellipsis">&hellip;</span>
        </React.Fragment>
      )
    }
    return null
  }

  lastPageLinkItem(path, pageNumber, totalPages) {
    if (this.hasLastPageLink(pageNumber, totalPages)) {
      const n = totalPages
      return (
        <React.Fragment>
          <span className="pagination-ellipsis">&hellip;</span>
          <Link  key={this.pageKey(n)} className='lastPage pagination-link' aria-label={`Goto page ${n}`} to={this.pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='pageNumber'>
              {n}
            </span>
          </Link>
        </React.Fragment>
      )
    }
    return null
  }

  pageLinkItems(path, pageNumber, totalPages) {
    let i = this.zeroIndex(pageNumber, totalPages)
    const j = this.lastIndex(pageNumber, totalPages)
    const a = []
    for (i, j; i < j; i = i + 1) {
      const n = (i + 1)
      a.push((
        <li key={this.pageKey(n)}>
          <Link className={`${currentPageClassName(pageNumber, n)} pagination-link`} aria-label={`Goto Page ${n}`}to={this.pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='pageNumber'>
              {n}
            </span>
          </Link>
        </li>
      ))
    }
    return a
  }

  componentWillReceiveProps({ pageNumber, totalPages }) {
    this.setState({
      pageNumber: toInteger(pageNumber),
      totalPages: toInteger(totalPages)
    })
  }

  shouldComponentUpdate(props) {
    return (
      (props.pageNumber !== this.props.pageNumber) ||
      (props.totalPages !== this.props.totalPages) ||
      (props.path !== this.props.path))
  }

  handleClick = (pageNumber) => this.props.onClick(pageNumber)

  render() {
    const { totalPages } = this.state
    if (totalPages > 1) {
      const { path } = this.props
      const { pageNumber } = this.state
      const page = calculatePageNumber(pageNumber, totalPages)
      if (totalPages > this.z()) {
        return (
          <nav className="pagination" role="pagination" aria-label="Pagination Navigation">
            {this.reversePageLinkItem(path, page, totalPages)}
            {this.forwardPageLinkItem(path, page, totalPages)}
            <ul className='pagination-list'>
              {this.zeroPageLinkItem(path, page, totalPages)}
              {this.pageLinkItems(path, page, totalPages)}
              {this.lastPageLinkItem(path, page, totalPages)}
            </ul>
          </nav>
        );
      }
      else {
        return (
          <nav className="pagination" role="pagination" aria-label="Pagination Navigation">
              {this.reversePageLinkItem(path, page, totalPages)}
              {this.forwardPageLinkItem(path, page, totalPages)}
            <ul className='pagination-list'>
              {this.pageLinkItems(path, page, totalPages)}
            </ul>
          </nav>
        );
      }
    }
    return null;
  }
}

Pagination.propTypes = {
  onClick: PropTypes.func,
  pageNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  path: PropTypes.string,
  totalPages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

Pagination.defaultProps = {
  onClick: () => {},
  pageNumber: 0,
  path: '',
  totalPages: 0
};
