import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce, Object } from 'lodash';
import setUserInfo from 'Store/actions/user';
import Api from 'Api/service';
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

const Login = (prop: any) => {
  const { userInfo, SetUserInfo } = prop; // user info
  // i18n
  const {
    intl: { formatMessage },
  } = prop;

  const history = useHistory(); // 路由

  // param 參數
  const [param, setParam] = useState({ account: '', password: '' });

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
  const ApiLogin = async () => {
    const {
      data,
      status: { code },
    }: any = await Api.Login({ account: 'admin', password: '9527' });
    if (code === 0) {
      SetUserInfo(data);
      history.push(Paths.Dashboard);
    }
  };
  // 防連點
  const SleepClick = debounce((fn: Function) => {
    fn();
  }, 1000);

  // 驗證成功
  const onFinish = (values: any) => {
    SleepClick(ApiLogin);
  };
  // 驗證失敗
  const onFinishFailed = (values: any) => {
    message.error('登入失敗');
  };

  // Randor -------------------------------------------------------------------
  return (
    <div className="Login">
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
              label={formatMessage({ id: 'login.account' })}
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
                value={param.account}
                placeholder={formatMessage({ id: 'msg.inputAccount' })}
                onChange={e => {
                  setParam({ ...param, account: e.target.value });
                }}
                autoComplete="current-account"
              />
            </Form.Item>
            {/* 密碼 */}
            <Form.Item
              name="password"
              label={formatMessage({ id: 'login.password' })}
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
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
const mapStateToProps = ({ userReducer }: any) => {
  return {
    userInfo: userReducer.get('userInfo'),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      SetUserInfo: setUserInfo,
    },
    dispatch
  );
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login));
