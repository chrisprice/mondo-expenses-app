import {
  AUTH_COMPLETE,
  PERFORM_AUTH,
  FETCH_ACCOUNTS,
  ACCOUNTS_COMPLETE,
  FETCH_TRANSACTIONS,
  TRANSACTIONS_COMPLETE
} from './monzo';
import {
  SELECT_ACCOUNT
} from './other';

export const loadState = () => ({
  accessToken: localStorage.accessToken,
  stateToken: localStorage.stateToken,
});

const saveState = state => {
  localStorage.accessToken = state.accessToken;
  localStorage.stateToken = state.stateToken;
  return state;
};

export default (state, action) => {
  switch (action.type) {
    case PERFORM_AUTH: {
      const { stateToken } = action;
      return saveState({
        ...state,
        accessToken: null,
        stateToken: stateToken
      });
    }
    case AUTH_COMPLETE: {
      const { accessToken } = action;
      return saveState({
        ...state,
        accessToken,
        stateToken: null
      });
    }
    case FETCH_ACCOUNTS: {
      return state;
    }
    case ACCOUNTS_COMPLETE: {
      const { accounts } = action;
      return {
        ...state,
        accounts
      };
    }
    case FETCH_TRANSACTIONS: {
      return state;
    }
    case TRANSACTIONS_COMPLETE: {
      const { transactions } = action;
      return {
        ...state,
        transactions
      };
    }
    case SELECT_ACCOUNT: {
      const { accountId } = action;
      const { accounts } = state;
      return {
        ...state,
        transactions: null,
        selectedAccountId: accountId
      };
    }
    default:
      console.log(state, action);
      return state;
  }
};