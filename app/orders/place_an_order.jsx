
import { useEffect, useState } from "react";

import { db, firebase } from "../../firebase"
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

import { AppContext } from "../hooks/firebaseContext";

import { useNavigate } from "react-router-dom";


export default function Place_an_order() {
        const { cart,user } = AppContext()
        const navigate = useNavigate();

        let array = []
        let sum = 0



    // Place an order
        useEffect(()=>{
            function test(){
                if(user){
                    if(user.uid){
                        action()
                    }
                }
            }
            test()
        },[user])
    
        async function action(){
            // Sprawdzenie, czy użytkownik jest zalogowany
                if(!user){
                    navigate('/login')
                }

            // Sprawdzenie, czy klient posiada jakiekolwiek produkty w koszyku
                if(cart.length<=0){
                    navigate('/cart')
                }
                
            // Nowa tabela
                sum = 0
                array = cart.map(x=>{
                    delete x.uid
                    sum += (x.price * x.amount).toFixed(2)
                    return x
                })

            // Pobranie daty
                const now = new Date();

                const day = now.getDate()
                const month = now.getMonth() + 1
                const year = now.getFullYear()
                const hours = now.getHours()
                let minutes = now.getMinutes()

                if(minutes<=9){
                    minutes="0"+minutes
                }

                const date = day+"/"+month+"/"+year+"   "+hours+":"+minutes


            const q = query(collection(db, 'cart'), where('uid', '==', user.uid));
        
            const querySnapshot = await getDocs(q).then((res)=>{
                console.log(res)
            })
            // dodaj tutaj żeby się wykonywało tylko jeśli jest więcej niż jedno i potem dodaj to zielone co jest na dole
        }

        // await addDoc(collection(db, "orders"), {
        //     "uid":user.uid,
        //     "payment":false,
        //     "data":date,
        //     "products": array,
        //     "total_price":sum
        // }).then(async (snapshot)=>{
        //     const key = snapshot.id;

        //     const q = query(collection(db, 'cart'), where('uid', '==', user.uid));

        //     const querySnapshot = await getDocs(q);
        //     const deletionPromises = [];

        //     querySnapshot.forEach((docSnapshot) => {
        //         const docRef = doc(db, 'cart', docSnapshot.id);
        //         deletionPromises.push(deleteDoc(docRef));
        //     });

        //     await Promise.all(deletionPromises).then(()=>{
        //         setLoading(false)
        //         navigate('/account/order/'+key)
        //     })
        // }).catch((error)=>{
        //     console.log(error)
        // })

    return(
        <>Loading</>
    )

}