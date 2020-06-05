export const localizations = {
  "description": "Описание сна",
  "keyEvents": "Ключевые события",
  "edit": "Редактировать",
  "delete": "Удалить",
  "deleteAlertTitle": "Удалить?",
  "deleteAlertMessage": "Удаляем эту запись о сне?",
  "deleteAlertYes": "Да",
  "deleteAlertNo": "Нет",
  "keywords": "Ключевые слова",
  "keywordInputPlaceHolder": "Разделяйте ключевые слова запятыми",
  "homeTitle": "Мои сны",
  "searchPlaceHolder": "Поиск",
  "newDreamTitle": "Новая запись",
  "editDreamTitle": "Редактировать",
  "dreamTitle": "Название сна",
  "events": "События дня, предшествующие сну",
  "moodsLabel": "Эмоции, с которыми проснулся (непосредственно после сна)",
  "moodPlaceHolder": "Настроение",
  "bad": "Плохо",
  "normal": "Нормально",
  "good": "Хорошо",
  "datePlaceHolder": "Я видел этот сон в ночь",
  "cancel": "Отмена",
  "confirm": "Подтвердить",
  "save": "Сохранить",
  "exportDreamsMailSubject": "Мои сны - резервная копия Ваших записей",
  "exportDreamsConfirm": "Экспортировать все Ваши записи?",
  "exportAlertYes": "Да",
  "exportAlertNo": "Нет",
  "myDreams": "Мои сны",
  "close": "Закрыть",
  "month_0": "января",
  "month_1": "февраля",
  "month_2": "марта",
  "month_3": "апреля",
  "month_4": "мая",
  "month_5": "июня",
  "month_6": "июля",
  "month_7": "августа",
  "month_8": "сентября",
  "month_9": "октября",
  "month_10": "ноября",
  "month_11": "декабря"
};

// import i18n from 'i18next';
// import { reactI18nextModule } from 'react-i18next';
// import Expo from 'expo';

// // creating a language detection plugin using expo
// // http://i18next.com/docs/ownplugin/#languagedetector
// const languageDetector = {
//   type: 'languageDetector',
//   async: true, // flags below detection to be async
//   detect: (callback) => { return /*'en'; */ Expo.Util.getCurrentLocaleAsync().then(lng => { callback(lng.replace('_', '-')); }) },
//   init: () => {},
//   cacheUserLanguage: () => {}
// }

// i18n
//   .use(languageDetector)
//   .use(reactI18nextModule)
//   .init({
//     fallbackLng: 'en',

//     resources: {
//       en: {
//         home: {
//           title: 'Welcome',
//           introduction: 'This text comes from i18next and is provided in english.'
//         },
//         page2: {
//           title: 'Page 2',
//           introduction: 'This text on page two.'
//         },
//         common: {
//           currentLanguage: 'The current language is "{{lng}}"',
//           actions: {
//             toggleToGerman: 'Deutsch',
//             toggleToEnglish: 'English',
//             goToPage2: 'Open page 2'
//           },
//           infoText: "<0><0>Eins </O><1>Zwei </1><2>Drei </2><3>Vier </3><4>Fünf</4></O>"
//         }
//       },
//       de: {
//         home: {
//           title: 'Willkommen',
//           introduction: 'Dieser Text ist von i18next und ist in deutsch.'
//         },
//         page2: {
//           title: 'Seite 2',
//           introduction: 'Text auf Seite 2'
//         },
//         common: {
//           currentLanguage: 'Die Sprache ist auf "{{lng}}" gesetzt',
//           actions: {
//             toggleToGerman: 'Deutsch',
//             toggleToEnglish: 'English',
//             goToPage2: 'Öffne Seite 2'
//           }
//         }
//       }
//     },

//     // have a common namespace used around the full app
//     ns: ['common'],
//     defaultNS: 'common',

//     debug: true,

//     // cache: {
//     //   enabled: true
//     // },

//     interpolation: {
//       escapeValue: false, // not needed for react as it does escape per default to prevent xss!
//     }
//   });


// export default i18n;



// import LocalizedStrings from 'react-native-localization';
// import { Alert } from 'react-native';


// export const localizations = new LocalizedStrings({
//   "en-US":  {
//     "description": "Description",
//     "keyEvents": "Key Events",
//     "edit": "Edit",
//     "delete": "Delete",
//     "deleteAlertTitle": "Delete?",
//     "deleteAlertMessage": "Deleting this dream record?",
//     "deleteAlertYes": "Yes",
//     "deleteAlertNo": "No",
//     "keywords": "Keywords",
//     "keywordInputPlaceHolder": "Separate keywords with comma (,)",
//     "homeTitle": "Home",
//     "searchPlaceHolder": "Search",
//     "newDreamTitle": "New Dream",
//     "editDreamTitle": "Edit Dream",
//     "dreamTitle": "Dream Title",
//     "events": "Events",
//     "moodsLabel": "How do you feel about your dream?",
//     "bad": "Bad",
//     "normal": "Normal",
//     "good": "Good",
//     "datePlaceHolder": "I saw this dream",
//     "cancel": "Cancel",
//     "confirm": "Confirm",
//     "save": "Save",
//     "myDreams": "My Dreams",
//     "close": "Close",
//     "month_0": "Jan",
//     "month_1": "Feb",
//     "month_2": "Mar",
//     "month_3": "Apr",
//     "month_4": "May",
//     "month_5": "Jun",
//     "month_6": "Jul",
//     "month_7": "Aug",
//     "month_8": "Sep",
//     "month_9": "Oct",
//     "month_10": "Nov",
//     "month_11": "Dec"
//   },
//   "ru": {
//     "description": "Описание",
//     "keyEvents": "Ключевые события",
//     "edit": "Редактировать",
//     "delete": "Удалить",
//     "deleteAlertTitle": "Удалить?",
//     "deleteAlertMessage": "Удаляем эту запись о сне?",
//     "deleteAlertYes": "Да",
//     "deleteAlertNo": "Нет",
//     "keywords": "Ключевые слова",
//     "keywordInputPlaceHolder": "Разделяйте ключевые слова запятыми",
//     "homeTitle": "Мои сны",
//     "searchPlaceHolder": "Поиск",
//     "newDreamTitle": "Новая запись",
//     "editDreamTitle": "Внести правки",
//     "dreamTitle": "Название сна",
//     "events": "События",
//     "moodsLabel": "Какой этот сон был по ощущениям?",
//     "bad": "Плохо",
//     "normal": "Нормально",
//     "good": "Хорошо",
//     "datePlaceHolder": "Я видел этот сон в ночь",
//     "cancel": "Отмена",
//     "confirm": "Подтвердить",
//     "save": "Сохранить",
//     "myDreams": "Мои сны",
//     "close": "Закрыть",
//     "month_0": "Январь",
//     "month_1": "Февраль",
//     "month_2": "Март",
//     "month_3": "Апрель",
//     "month_4": "Май",
//     "month_5": "Июнь",
//     "month_6": "Июль",
//     "month_7": "Август",
//     "month_8": "Сентябрь",
//     "month_9": "Октябрь",
//     "month_10": "Ноябрь",
//     "month_11": "Декабрь"
//   }
//  }
// );