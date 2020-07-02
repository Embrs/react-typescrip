import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';
import setAuthInfo from 'Store/actions/auth';
import $api from 'plugins/api';
import Paths from 'plugins/route/paths';
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

// Main ======================================================================
const SignIn = (prop: any) => {
  const { SetAuthInfo, imgUrl } = prop; // auth info
  // i18n
  const {
    intl: { formatMessage },
  } = prop;

  const history = useHistory(); // 路由

  // params 取參數  設定參數
  const [params, setParam] = useState({ email: '', password: '' });

  // 畫面結構 ------------------------------------------------------------------
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  // Method -------------------------------------------------------------------
  // 登入 API
  const ApiSignIn = async () => {
    const {
      data,
      status: { code },
    }: any = await $api.SignIn(params);
    if (code === 0) {
      SetAuthInfo(data);
      history.push(Paths.Dashboard);
    }
  };

  // 驗證成功
  const onFinish = debounce(() => {
    ApiSignIn();
  }, 1000);

  // 驗證失敗
  const onFinishFailed = () => {
    // message.error('請填入資料');
  };

  // Randor -------------------------------------------------------------------
  return (
    <div id="signIn" style={{ backgroundImage: `url(${imgUrl.backimg})` }}>
      <div className="signIn-area">
        {/* icon */}
        <div className="icon">
          <img className="icon-image" src={imgUrl.icon} alt="Background" />
          <div className="logo">
            <img className="logo-image" src={imgUrl.logo} alt="Background" />
            <div className="text"> 管理後台 </div>
          </div>
          {/* <div>{JSON.stringify(authInfo)}</div> */}
        </div>
        <div className="line"> </div>
        <div className="line-text"> 一般登入 </div>
        {/* form */}
        <Form
          {...layout}
          className="form"
          name="basic"
          colon={false} // 冒號
          hideRequiredMark // 必填＊隱藏
          initialValues={{ rememberCheckBox: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* 信箱 */}
          <Form.Item
            name="email"
            label="信箱"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="msg.inputEmail" />,
              },
            ]}
            // validateStatus={account.validateStatus}
            // help={account.errorMsg || ' '}
          >
            <Input
              value={params.email}
              placeholder={formatMessage({ id: 'msg.inputEmail' })}
              onChange={e => {
                setParam({ ...params, email: e.target.value });
              }}
              autoComplete="current-account"
            />
          </Form.Item>
          {/* 密碼 */}
          <Form.Item
            name="password"
            label="密碼"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="msg.inputPassword" />,
              },
            ]}
          >
            <Input.Password
              value={params.password}
              placeholder={formatMessage({ id: 'msg.inputPassword' })}
              autoComplete="current-password"
              onChange={e => {
                setParam({ ...params, password: e.target.value });
              }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            登入
          </Button>
          {/* 記住我 */}
          <Form.Item
            {...tailLayout}
            name="rememberCheckBox"
            valuePropName="checked"
          >
            <Checkbox>記住我</Checkbox>
          </Form.Item>
          {/* 送出 */}
        </Form>
      </div>
    </div>
  );
};

// ============================================================================
const mapStateToProps = ({ authReducer, commonReducer }: any) => {
  return {
    authInfo: authReducer.get('authInfo'),
    imgUrl: commonReducer.get('imgUrl'),
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
