import { fetchTransactions } from './monzo';
import { promiseWrapper } from './util';

export const SELECT_ACCOUNT = 'SELECT_ACCOUNT';

export const selectAccount = ({ accountId }) =>
  promiseWrapper(async (dispatch, getState) => {
    dispatch({
      type: SELECT_ACCOUNT,
      accountId
    });
    await fetchTransactions({ accountId })(dispatch, getState);
  });