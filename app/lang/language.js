
import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import en from "./en.json"
import pl from "./pl.json"
import ua from "./ua.json"


let defLang = localStorage.getItem('lang');
if(defLang){
  if(defLang=="en"||defLang=="pl"||defLang=="ua"){

  }else{
    defLang = "pl"
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    "resources": {
      "en":{"translation":en},
      "pl":{"translation":pl},
      "ua":{"translation":ua}
    },
    "lng": defLang,
    // "fallbackLng": "en",

    "interpolation": {
        "escapeValue": false
    },
    

});
