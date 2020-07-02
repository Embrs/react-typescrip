import { Map } from 'immutable';
import { Action } from 'Structure/store';

// 儲存區
const initialState = Map({
  locale: 'zh',
  imgUrl: {
    backimg: 'https://storage.cloud.google.com/csofans/backimg.svg',
    logo: 'https://storage.googleapis.com/csofans/logo.png',
    icon: 'https://storage.googleapis.com/csofans/icon.png',
    fbIcon: 'https://storage.googleapis.com/csofans/fbIcon.png',
    lineIcon: 'https://storage.googleapis.com/csofans/lineIcon.png',
    icon2: 'https://storage.googleapis.com/csofans/icon2.png',
    error: 'https://storage.googleapis.com/csofans/error.png',
    loading: 'https://storage.googleapis.com/csofans/loading.gif',
    robotImg: 'https://storage.cloud.google.com/csofans/robot.png',
  },
});

// 寫入
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
