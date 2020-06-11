import { Map } from 'immutable';
import { Action } from 'Structure/store';

const initialState = Map({
  locale: 'zh',
});

// user Reducer
export default (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_LOCALE': {
      return state.set('locale', action.payload);
    }
    default:
      return state;
  }
};
