import { Map } from 'immutable';
import { Action } from 'Structure/store';

const initialState = Map({
  userInfo: {},
});

// user Reducer
export default (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_AUTH_INFO': {
      return state.set('authInfo', action.payload);
    }
    default:
      return state;
  }
};
