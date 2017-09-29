import { fetchTransactions } from './monzo';
import { promiseWrapper } from './util';

export const CLEAR_AUTH = 'CLEAR_AUTH';

export const clearAuth = () => ({
  type: CLEAR_AUTH
});