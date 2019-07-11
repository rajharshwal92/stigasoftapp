import * as LOGIN_CONSTANTS from '../../src/constants/login'

const loginReducer = (state = {
  type: '',
  error: '',
  isFetching: false,
  lookUpData: {}
}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case LOGIN_CONSTANTS.REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
      });
    case LOGIN_CONSTANTS.RECEIVED_LOGIN:
      return Object.assign({}, state, {
        error: '',
        isFetching: false,
        type: action.type,
        lookUpData: action.data,
      });
    case LOGIN_CONSTANTS.RECEIVED_LOGIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
        lookUpData: [],
        lastUpdated: action.receivedAt
      });

  }
  return state;
}

export default loginReducer;