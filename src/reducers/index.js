import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './login';
import * as Log from '../constants/login';
let appReducer = combineReducers(
  {
    //reducer code will come here
    form: formReducer,
    loginReducer
  }
);
const rootReducer = (state, action) => {
  if (action.type === Log.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}
export default rootReducer;