
import { db } from "../../firebase"
import { doc,getDoc } from "firebase/firestore"

export default async function Pay(user,lang,exchangeRates,method,id){
    // Sprawdzenie, czy użytkownik jest zalogowany
        if(!user){
            return "Zaloguj się"
        }

    // Sprawdzenie, czy klient posiada jakiekolwiek produkty w koszyku
        async function getOrder() {
            const docRef = doc(db, 'orders', id);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null;
            }
        }

    // All processing
        const orderProcessing = await getOrder()
        if(orderProcessing){
            const array = orderProcessing.products.map(x=>{
                if(lang == "pl"){
                    return {
                        "price_data":
                        {
                            "currency":"pln",
                            "unit_amount":(x.price*100*exchangeRates.PLN).toFixed(),
                            "product_data":{
                                "name":x.name,
                                "description":"Opis produktu",
                            }
                        },
                        "quantity":x.amount
                    }
                }
                if(lang == "en"){
                    return {
                        "price_data":
                        {
                            "currency":"usd",
                            "unit_amount":(x.price*100).toFixed(),
                            "product_data":{
                                "name":x.name,
                                "description":"Opis produktu",
                            }
                        },
                        "quantity":x.amount
                    }
                }
                if(lang == "ua"){
                    return {
                        "price_data":
                        {
                            "currency":"uah",
                            "unit_amount":(x.price*100*exchangeRates.UAH).toFixed(),
                            "product_data":{
                                "name":x.name,
                                "description":"Opis produktu",
                            }
                        },
                        "quantity":x.amount
                    }
                }
            })
            try {
                const response = fetch('https://us-central1-zrzutshop.cloudfunctions.net/api/create-checkout-session/'+method+"/"+id, {
                // const response = fetch('http://localhost:5001/zrzutshop/us-central1/app/create-checkout-session/'+method+"/"+id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(array),
                })
                const res = (await response).json()
                return res
            } catch (error) {
                return error;
            }
        }
}