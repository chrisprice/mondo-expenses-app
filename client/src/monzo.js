import MonzoApi from 'monzo-api';
import { selectAccount } from './other';
import { promiseWrapper, startOfMonth } from './util';

const {
  REACT_APP_MONZO_CLIENT_ID: clientId,
  REACT_APP_MONZO_CLIENT_SECRET: clientSecret
} = process.env;
const monzo = new MonzoApi(clientId, clientSecret);
monzo.redirectUrl = new URL('/auth', window.location).toString();

export const PERFORM_AUTH = 'PERFORM_AUTH';
export const AUTH_COMPLETE = 'AUTH_COMPLETE';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const ACCOUNTS_COMPLETE = 'ACCOUNTS_COMPLETE';
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const TRANSACTIONS_COMPLETE = 'TRANSACTIONS_COMPLETE';


export const performAuth = () =>
  dispatch => {
    const authorizationUrl = monzo.authorizationUrl;
    dispatch({
      type: PERFORM_AUTH,
      stateToken: monzo.stateToken
    });
    window.location = authorizationUrl;
  };

export const authCallback = ({ code, state }) =>
  promiseWrapper(async (dispatch, getState) => {
    const { stateToken } = getState();
    const { access_token: accessToken } = await monzo.authenticate(code, state, stateToken);
    dispatch({
      type: AUTH_COMPLETE,
      accessToken
    });
    await fetchAccounts()(dispatch, getState);
  });

export const fetchAccounts = () =>
  promiseWrapper(async (dispatch, getState) => {
    const { accessToken } = getState();
    dispatch({
      type: FETCH_ACCOUNTS
    });
    const { accounts } = await monzo.accounts(accessToken);
    dispatch({
      type: ACCOUNTS_COMPLETE,
      accounts
    });
    // this is horrible
    if (accounts.length > 0) {
      await selectAccount({ accountId: accounts[0].id })(dispatch, getState);
    }
  });

export const fetchTransactions = ({ accountId, since = startOfMonth(), before }) =>
  promiseWrapper(async (dispatch, getState) => {
    const { accessToken } = getState();
    dispatch({
      type: FETCH_TRANSACTIONS
    });
    const query = { limit: 100 };
    if (since != null) {
      query.since = since instanceof Date ? since.toISOString() : since;
    }
    if (before != null) {
      query.before = before.toISOString();
    }
    const { transactions } = await monzo.transactions(accountId, true, query, accessToken);
    const expenseTransactions = transactions.filter(({ merchant }) => merchant != null)
      .filter(({ category }) => category === 'expenses')
      .map(({
        id,
        created,
        settled,
        merchant: { name, category },
        amount,
        currency,
        local_amount: localAmount,
        local_currency: localCurrency,
        notes,
        metadata,
        attachments
    }) => ({
          id,
          created: new Date(created),
          settled: settled !== '',
          merchant: name,
          category,
          amount,
          currency,
          localAmount: localCurrency !== currency ? localAmount : null,
          localCurrency: localCurrency !== currency ? localCurrency : null,
          notes,
          metadata,
          attachments
        }));
    dispatch({
      type: TRANSACTIONS_COMPLETE,
      transactions: expenseTransactions
    });
  });