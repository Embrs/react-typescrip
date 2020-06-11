import { Action } from 'Structure/store';

const setUserInfo = (payload: Action['payload']): Action => {
  return {
    type: 'SET_USER_INFO',
    payload,
  };
};

export default setUserInfo;
