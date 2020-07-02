import { Has } from 'Utils';

const ErrorCode: { [key: string]: string } = {
  0: 'sErr0', // success
  100: 'NetworkError', // error
};

export default (code: string) => {
  code = `${code}`.replace(/[^0-9]/g, '');
  return Has(ErrorCode, code) ? ErrorCode[code] : code;
};
