import React from 'react'
import PropTypes from 'prop-types'

import {
  Standard
} from './standard'

import {
  Centered
} from './centered'

import {
  calculateTotalPages,
  calculatePageNumber
} from './prototype'

export {
  Standard,
  Centered
}

const Pagination = ({ format, ...props }) => (
  format !== 'center'
    ? <Standard {...props} />
    : <Centered {...props} />
)

Pagination.calculateTotalPages = calculateTotalPages
Pagination.calculatePageNumber = calculatePageNumber

Pagination.propTypes = {
  format: PropTypes.string
}

export default Pagination
