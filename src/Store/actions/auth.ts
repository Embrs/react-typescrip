import { Action } from 'Structure/store';

const setAuthInfo = (payload: Action['payload']): Action => {
  return {
    type: 'SET_AUTH_INFO',
    payload,
  };
};

export default setAuthInfo;
