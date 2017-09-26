import React from 'react';
import { connect } from 'react-redux';
import { performAuth } from './monzo';
import Accounts from './Accounts';
import Transactions from './Transactions';

const App = ({ authenticated, accountSelected, performAuth }) =>
  authenticated ?
    <div>
      <Accounts />
      {accountSelected &&
        <Transactions />
      }
    </div> :
    <button onClick={performAuth}>Login</button>;

export default connect(
  ({ accessToken, selectedAccountId }) => ({
    authenticated: accessToken != null,
    accountSelected: selectedAccountId != null
  }),
  { performAuth }
)(App);
