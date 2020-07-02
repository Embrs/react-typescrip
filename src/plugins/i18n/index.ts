import antEn from 'antd/es/locale/en_US';
import antZh from 'antd/es/locale/zh_TW';
import i18nEn from 'plugins/i18n/locale/en';
import i18nZh from 'plugins/i18n/locale/zh';

const LocaleMsg = (locale: string) => {
  switch (locale) {
    case 'zh':
      return { i18n: i18nZh, ant: antZh };
    case 'zh-TW':
      return { i18n: i18nZh, ant: antZh };
    case 'zh-Hant':
      return { i18n: i18nZh, ant: antZh };
    case 'en':
      return { i18n: i18nEn, ant: antEn };
    default:
      return { i18n: i18nZh, ant: antZh };
  }
};

export default LocaleMsg;
