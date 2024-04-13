

import { AppContext } from "../hooks/firebaseContext";

import { db, firebase } from "../../firebase"
import { addDoc, collection } from "firebase/firestore";


export default async function Place_an_order(cart, user, exchangeRates) {

    // Sprawdzenie, czy użytkownik jest zalogowany
        if(!user){
            return "Musisz się zalogować, aby złożyć zamówienie"
        }

    // Sprawdzenie, czy klient posiada jakiekolwiek produkty w koszyku
        if(cart.length<=0){
            return "Brak produktów w koszyku"
        }

    // Place an order
        await addDoc(collection(db, "orders"), {
            "uid":user.uid,
            "payment":false,
            "data":"dzisiaj",
            "products": cart
        }).then((snapshot)=>{
            const key = snapshot.id;
            console.log("--------------",key)
        }).catch((error)=>{
            console.log(error)
        })

        

}