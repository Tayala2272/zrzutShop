
import { UserAuth } from "../hooks/auth"

import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


export default async function Place_an_order(user, city, street, hNumber, mail, phone, name, lastName) {
    // Sprawdzenie, czy użytkownik jest zalogowany
        const { user } = UserAuth()
        if(user){
            return "Musisz się zalogować, aby złożyć zamówienie"
        }

    // Sprawdzenie, czy klient posiada jakiekolwiek produkty w koszyku
        const q = query(collection(db, "cart"), where("uid", "==", user.uid));
        
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size<=0){
            return "Brak produktów w koszyku"
        }

        
    // Sprawdzanie jakie produkty klient ma w koszyku
        const prodRef = collection(db, "products")
        const array =[]
        let orderPrice = 0
        querySnapshot.forEach((doc) => {
            const price = getDoc(doc(db, "products", doc.data().id)).data().price
            orderPrice += price*amount
            array.push({
                "product_id":doc.data().id, 
                "amount": doc.data().amount,
                "price": price
            })
            deleteDoc(doc)
        });

    // Złożenie zamówienia
        const docRef = await addDoc(collection(db, "orders"), {
            uid: user.uid,
            location: {
                city: city,
                street: street,
                houseNumber: hNumber
            },
            contact: {
                name: name,
                lastName: lastName,
                mail: mail,
                phone: phone,
            },
            products: array,
            payment: "waiting"
        });
        if(docRef.id){
            return "Złożono zamówienie"
        }else{
            return "Error"
        }

}