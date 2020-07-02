import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';
import setAuthInfo from 'Store/actions/auth';
import $api from 'plugins/api';
import Paths from 'Route/paths';
import logo from 'assets/logo.png';
import './style.scss';

// const validateStr = val => {
//   if (val.length > 0) {
//     return {
//       validateStatus: 'success',
//       errorMsg: '',
//     };
//   }
//   return {
//     validateStatus: 'error',
//     errorMsg: '請輸入',
//   };
// };

const SignIn = (prop: any) => {
  const { userInfo, SetAuthInfo } = prop; // user info
  // i18n
  const {
    intl: { formatMessage },
  } = prop;

  const history = useHistory(); // 路由

  // param 參數
  const [param, setParam] = useState({ email: '', password: '' });

  // 畫面結構 ------------------------------------------------------------------
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  // Method -------------------------------------------------------------------
  // 登入 API
  const ApiSignIn = async () => {
    const {
      data,
      status: { code },
    }: any = await $api.SignIn({
      email: 'harry@axolotl.com.tw',
      password: '111111',
    });
    if (code === 0) {
      SetAuthInfo(data);
      history.push(Paths.Dashboard);
    }
  };
  // 防連點
  const SleepClick = debounce((fn: Function) => {
    fn();
  }, 1000);

  // 驗證成功
  const onFinish = (values: any) => {
    SleepClick(ApiSignIn);
  };
  // 驗證失敗
  const onFinishFailed = (values: any) => {
    message.error('登入失敗');
  };

  // Randor -------------------------------------------------------------------
  return (
    <div className="SignIn">
      <div className="login-bar">
        <div className="item-box">
          <img className="logo" src={logo} alt="Background" />
          <div className="title"> CsoFans </div>
          <div>{JSON.stringify(userInfo)}</div>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* 信箱 */}
            <Form.Item
              name="account"
              label={formatMessage({ id: 'signIn.account' })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.inputAccount" />,
                },
              ]}
              // validateStatus={account.validateStatus}
              // help={account.errorMsg || ' '}
            >
              <Input
                value={param.email}
                placeholder={formatMessage({ id: 'msg.inputAccount' })}
                onChange={e => {
                  setParam({ ...param, email: e.target.value });
                }}
                autoComplete="current-account"
              />
            </Form.Item>
            {/* 密碼 */}
            <Form.Item
              name="password"
              label={formatMessage({ id: 'signIn.password' })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.inputPassword" />,
                },
              ]}
            >
              <Input.Password
                value={param.password}
                placeholder={formatMessage({ id: 'msg.inputPassword' })}
                autoComplete="current-password"
                onChange={e => {
                  setParam({ ...param, password: e.target.value });
                }}
              />
            </Form.Item>
            {/* 記住我 */}
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {/* 送出 */}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                SignIn
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
const mapStateToProps = ({ authReducer }: any) => {
  return {
    userInfo: authReducer.get('userInfo'),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      SetAuthInfo: setAuthInfo,
    },
    dispatch
  );
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SignIn));
