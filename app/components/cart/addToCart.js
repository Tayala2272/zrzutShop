

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";




export default async function AddToCart(id,amount,user){

    // Sprawdzenie, czy użytkownik jest zalogowany
        if(!user){
            return "Musisz się zalogować, aby dodać produkt do koszyka"
        }

    // Dodanie do koszyka
        const docRef = await addDoc(collection(db, "cart"), {
            "id":id,
            "amount":amount,
            "uid":user.uid
        });


    // SPrawdzenie, czy dodanie się powiodło
        if(docRef){
            return "Dodano produkt do koszyka"
        }else{
            return "Error"
        }   
}