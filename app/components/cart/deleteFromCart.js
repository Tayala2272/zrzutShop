
import { db } from "../../../firebase"
import { deleteDoc, doc } from "firebase/firestore"

export default async function DeleteFromCart(user,id) {
    if(!user){
        return "Musisz się zalogować"
    }

    deleteDoc(doc(db, "cart", id)).then(()=>{
        return "Usunięto z koszyka"
    }).catch(err=>{
        return err
    })
}