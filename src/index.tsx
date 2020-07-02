import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { setConfig } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';

import LocaleMsg from 'plugins/i18n';
import store from 'Store';
import App from 'App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
// eslint-disable-next-line import/no-unresolved

setConfig({
  showReactDomPatchNotification: false,
});

const Root = () => {
  const [locale, setLocale] = useState(navigator.language);
  const localeMsg = LocaleMsg(locale);

  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        key={locale}
        defaultLocale="en"
        messages={localeMsg.i18n}
      >
        <ConfigProvider locale={localeMsg.ant}>
          <BrowserRouter>
            <Switch>
              <App setLocale={setLocale} />
            </Switch>
          </BrowserRouter>
        </ConfigProvider>
      </IntlProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
