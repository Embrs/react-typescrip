import { Action } from 'Structure/store';

const setLocale = (payload: Action['payload']): Action => {
  return {
    type: 'SET_LOCALE',
    payload,
  };
};

export default setLocale;
