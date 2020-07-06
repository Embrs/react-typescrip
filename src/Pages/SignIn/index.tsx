import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce, cloneDeep } from 'lodash';
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
  const signInInfo = cloneDeep(localStorage.getObjectHash('signInInfo'));
  const [params, setParam] = useState(
    signInInfo? {
          email: signInInfo.email,
          password: signInInfo.password,
        }
      : {
          email: '',
          password: '',
        }
  );
  const [status, setStatus] = useState({ rememberMe: false });

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
    localStorage.clear();
    if (status.rememberMe) {
      localStorage.setObjectHash('signInInfo', params); // 記住我
    }
    const {
      data,
      status: { code },
    }: any = await $api.SignIn(params);
    if (code === 0) {
      localStorage.setObjectHash('autInfo', data); // 記住我
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

  // 記住我 改變
  const onRememberMeChange = (e: any) => {
    // console.log("eee", e)
    setStatus({ ...status, rememberMe: e.target.checked });
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
              defaultValue={params.email}
              placeholder={formatMessage({ id: 'msg.inputEmail' })}
              onChange={e => {
                setParam({ ...params, email: e.target.value });
              }}
              autoComplete="current-account"
            />
          </Form.Item>
          {/* 密碼 */}
          <Form.Item
            className="g-padding-top-5"
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
              defaultValue={params.password}
              placeholder={formatMessage({ id: 'msg.inputPassword' })}
              autoComplete="current-password"
              onChange={e => {
                setParam({ ...params, password: e.target.value });
              }}
            />
          </Form.Item>
          <div className="g-padding-top-5" />
          <Button type="primary" htmlType="submit" block>
            登入
          </Button>
          {/* 記住我 */}
          <Form.Item {...tailLayout} className="g-padding-top-10">
            <Checkbox
              defaultChecked={status.rememberMe}
              onChange={onRememberMeChange}
            >
              記住我
            </Checkbox>
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
