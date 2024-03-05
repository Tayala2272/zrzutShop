
import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    "resources": {
        "en": {
            "translation": {
                "test": "This is a test message"
            }
        },
        "pl": {
            "translation": {
                "test": "To jest wiadomość testowa"
            }
        },
        "ua":{
            "translation": {
                "test": "Це тестове повідомлення"
            }
        }
    },
    // "lng": "pl",
    "fallbackLng": "en",

    "interpolation": {
        "escapeValue": false
    }
});
