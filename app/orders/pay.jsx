
import { useState } from "react"

import { useParams } from "react-router-dom"
import { AppContext } from "../hooks/firebaseContext"

import { db } from "../../firebase"
import { doc,getDoc } from "firebase/firestore"

export default function Pay(){
    const [loading,setLoading] = useState(true)

    const { user, lang, exchangeRates } = AppContext()
    const { method,id } = useParams()


    // Sprawdzenie, czy użytkownik jest zalogowany
    if(!user){
        navigate('/login')
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

    getOrder().then(res=>{
        const array = res.products.map(x=>{
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
            // fetch('https://app-ae7icdkcxq-uc.a.run.app/create-checkout-session/'+method, {
            fetch('http://localhost:5001/zrzutshop/us-central1/app/create-checkout-session/'+method, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(array),
            }).then(res=>res.json())
            .then(res=>window.location.href = res)                
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    })



    

    return (
        <>Loading</>
    )
}