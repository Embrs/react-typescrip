import axios from 'axios';
import { ToQuerystr, Has } from 'Utils';
import { message } from 'antd';
// import LocaleMsg from 'I18n';
// import NetErrorCode from './ErrorCode/net';
import SysErrorCord from './ErrorCode/system';
import config from './config';

const errorRes = { data: null, status: { code: null } };
const axiosIns = axios.create(config);
// 回傳攔截
axiosIns.interceptors.response.use(
  response => {
    if (
      !Has(response, 'data') ||
      !Has(response.data, 'status') ||
      !Has(response.data.status, 'code')
    ) {
      return errorRes;
    }

    const { code } = response.data.status;

    if (`${code}` === '0') return response.data;
    if (`${code}` === '220') return response.data; // 不顯示查無資料
    if (`${code}` === '3001') window.location.href = '/'; // token 異常，登出
    if (`${code}` === SysErrorCord(code)) {
      // 未編列的異常碼
      message.error(`未知異常${code}`);
      return errorRes;
    }
    message.error(`異常${code}`);
    return errorRes;
  },
  error => {
    if (String(error.response.status) !== '200') {
      message.error(
        // `${LocaleMsg(navigator.language).i18n['err.NetworkErr']}${
        //   error.response.status
        // }`
        `網路異常 ${error.response.status}`
      );
    }
    return errorRes;
  }
);

/**
 * Get method
 * @param { String } uri
 * @param { Object } headers
 */
const Get = (uri: string, Params: object, headers: any) =>
  new Promise(resolve => {
    axiosIns
      .get(uri + ToQuerystr(Params), { headers })
      .then(response => resolve(response));
  });

/**
 * Post method
 * @param { String } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Post = (uri: string, Params: object, headers: unknown) =>
  new Promise(resolve => {
    axiosIns
      .post(uri, JSON.stringify(Params), { headers })
      .then(response => resolve(response));
  });

/**
 * Put method
 * @param { String } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Put = (uri: string, Params: object, headers: unknown) =>
  new Promise(resolve => {
    axiosIns
      .put(uri, JSON.stringify(Params), { headers })
      .then(response => resolve(response));
  });

/**
 * Delete method
 * @param { String } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Delete = (uri: string, Params: object, headers: unknown) =>
  new Promise(resolve => {
    axiosIns.delete(uri, { headers }).then(response => resolve(response));
  });

export { Get, Post, Put, Delete };
