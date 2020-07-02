import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import commonReducer from 'Store/reducers/common';
import authReducer from 'Store/reducers/auth';

const rootReducer = combineReducers({
  commonReducer,
  authReducer,
});

export default createStore(rootReducer, composeWithDevTools());
