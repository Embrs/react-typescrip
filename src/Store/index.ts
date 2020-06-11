import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import commonReducer from 'Store/reducers/common';
import userReducer from 'Store/reducers/user';

const rootReducer = combineReducers({
  commonReducer,
  userReducer,
});

export default createStore(rootReducer, composeWithDevTools());
