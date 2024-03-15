
import { collection, getDocs, addDoc, setDoc, query, where } from "firebase/firestore";

import { db } from "../../firebase";
import { UserAuth } from "../hooks/auth";

export default async function Add_to_cart(id, value) {
    const { user } = UserAuth();

    if (!user) {
        return "Musisz się zalogować, aby dodać produkt do koszyka!";
    } else if (typeof(value) === 'number' && value > 0) {
        const collRef = collection(db, "cart");
        const q = query(collRef, where("uid", "==", user.uid), where("id", "==", id));

        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            await setDoc(docSnap.ref, {
                uid: user.uid,
                id: id,
                amount: value + docSnap.data().amount
            });
            return "Dodano do koszyka";
        } else {
            await addDoc(collRef, {
                uid: user.uid,
                id: id,
                amount: value
            });
            return "Dodano do koszyka";
        }
    } else {
        alert("Dodaj co najmniej jeden produkt");
    }
}
