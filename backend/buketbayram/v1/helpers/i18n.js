const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');

const en = require('../locales/en/translation.json');
const tr = require('../locales/tr/translation.json');

i18next.use(i18nextMiddleware.LanguageDetector).init({
  fallbackLng: 'tr',
  supportedLngs: ['tr', 'en'],
  load: 'languageOnly',
  resources: {
    tr: {translation: tr},
    en: {translation: en}
  },
  detection: {
    order: ['header'],
    caches: false
  },
  interpolation: {
    escapeValue: false
  },
  initImmediate: false
});

module.exports = i18next;
