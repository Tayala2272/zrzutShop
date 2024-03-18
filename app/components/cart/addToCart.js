

import { collection, addDoc, query, where, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";




export default async function AddToCart(id,amount,user,price,name,img){

    // Sprawdzenie, czy użytkownik jest zalogowany
        if(!user){
            return "Musisz się zalogować, aby dodać produkt do koszyka"
        }

    // Sprawdzenie czy liczba jest większa od 0
        if (typeof(amount) !== 'number' || amount <= 0){
            return "Dodaj chociaż jeden produkt do koszyka"
        }

    // Dodanie do koszyka
        const collRef = collection(db, "cart");
        const q = query(collRef, where("uid", "==", user.uid), where("id", "==", id));

        const querySnapshot = await getDocs(q);
        let docRef
        
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            docRef = await setDoc(docSnap.ref, {
                uid: user.uid,
                id: id,
                amount: amount + docSnap.data().amount,
                price: price,
                name: name,
                img: img
            });
            docRef=true
        } else {
            docRef = await addDoc(collRef, {
                uid: user.uid,
                id: id,
                amount: amount,
                price: price,
                name: name,
                img: img
            });
        }


    // SPrawdzenie, czy dodanie się powiodło
        if(docRef){
            return "Dodano produkt do koszyka"
        }else{
            return "Error"
        }   
}