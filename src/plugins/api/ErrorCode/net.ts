import { Has } from 'Utils';

const ErrorCode: { [key: string]: string } = {
  100: 'NetworkErr', // error
  200: 'success', // success
  400: 'NetworkErr', // 請求錯誤
  401: 'NetworkErr', // 未授權
  403: 'NetworkErr', // 拒絕訪問
  404: 'NetworkErr', // 請求錯誤, 未找到該資源
  405: 'NetworkErr', // 請求方法未准許
  408: 'NetworkErr', // 請求超時
  500: 'NetworkErr', // 請求錯誤
  501: 'NetworkErr', // 網路未實現
  502: 'NetworkErr', // 網路錯誤
  503: 'NetworkErr', // 服務不可用
  504: 'NetworkErr', // 網路超時
  505: 'NetworkErr', // http版本不支持該請求
};

export default (code: string) => {
  code = `${code}`.replace(/[^0-9]/g, '');
  return Has(ErrorCode, code) ? ErrorCode[code] : code;
};
