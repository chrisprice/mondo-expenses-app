import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../monzo';
import Loading from '../chrome/Loading';
import ms from 'ms';

const mapStateToProps = ({ claims, since, loading }) =>
  ({
    claims,
    since,
    loading: claims == null || loading.length > 0
  });

const mapDispatchToProps = { fetchTransactions };

export default WrappedComponent => {

  class WithClaims extends Component {

    loadMore() {
      const { since: previousSince, fetchTransactions } = this.props;
      const since = new Date(new Date(previousSince) - ms('0.25 years'));
      fetchTransactions(since);
    }

    componentWillMount() {
      const since = new Date(new Date() - ms('0.25 years'));
      const { since: previousSince, fetchTransactions } = this.props;
      if (previousSince == null || since < new Date(previousSince)) {
        fetchTransactions(since);
      }
    }

    render() {
      const { claims, since, loading, ...other } = this.props
      return loading ?
        <Loading /> :
        <WrappedComponent
          claims={claims}
          since={since}
          loadMore={() => this.loadMore()}
          {...other}
        />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithClaims);
};