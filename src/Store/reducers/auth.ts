import { Map } from 'immutable';
import { Action } from 'Structure/store';

const initialState = Map({
  autoInfo: {},
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
