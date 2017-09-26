import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse as parseQueryString } from 'querystring';
import { authCallback } from './monzo';

class Auth extends Component {
  componentWillMount() {
    const { location, authCallback } = this.props;
    const queryString = location.search.substr(1);
    const params = parseQueryString(queryString);
    authCallback(params);
  }

  render() {
    return (
      <div>Auth in progress</div>
    );
  }
}

export default connect(null, { authCallback })(Auth);
