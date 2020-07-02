import { hot } from 'react-hot-loader/root';
import React from 'react';
import './App.scss';
import RouteHander from 'plugins/route';

import routes from 'plugins/route/routes';

// const ChangeLocale = (setLocale: any, locale: string) => {
//   setLocale(locale);
// };

const App = ({ setLocale }: any) => {
  return (
    <div className="App">
      {/* <button type="button" onClick={() => ChangeLocale(setLocale, 'en')}>
        英文
      </button>
      <button type="button" onClick={() => ChangeLocale(setLocale, 'zh-TW')}>
        中文
      </button> */}
      {RouteHander(routes)}
    </div>
  );
};

export default hot(App);
