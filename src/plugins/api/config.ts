import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  method: 'post',
  baseURL: process.env.REACT_APP_API_URL,
  transformRequest: [
    (data, headers) => {
      headers['Content-Type'] = 'application/json';
      headers.Authorization = localStorage.getItem('token');
      return data;
    },
  ],
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  // 攜帶憑證
  withCredentials: false,
  // 返回資料型別
  responseType: 'json',
};

export default config;
