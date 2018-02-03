import React from 'react';
import './ApiError.scss'

export default class ApiError extends React.Component {
   render() {
     return(
        <p className="api_error"><strong>{this.props.message}.</strong> Please try again. If error persists, contact administrator.</p>
     )
   }
}
