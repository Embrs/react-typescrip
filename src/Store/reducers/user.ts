import { Map } from 'immutable';
import { Action } from 'Structure/store';

const initialState = Map({
  userInfo: {},
});

// user Reducer
export default (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_USER_INFO': {
      return state.set('userInfo', action.payload);
    }
    default:
      return state;
  }
};
