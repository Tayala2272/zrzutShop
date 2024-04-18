


import { db } from "../../firebase"
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";


export default async function Place_an_order(cart,user,navigate) {
            // Sprawdzenie, czy użytkownik jest zalogowany
                if(!user){
                    return "Zaloguj się"
                }

            // Sprawdzenie, czy klient posiada jakiekolwiek produkty w koszyku
                if(cart.length<=0){
                    "Musisz mieć co najmniej 1 produkt w koszyku"
                }
                
            // Nowa tabela
                let sum = 0
                let array = []
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
        
            const querySnapshot = await getDocs(q).then(async (res)=>{
                if(res.size>0){
                    await addDoc(collection(db, "orders"), {
                        "uid":user.uid,
                        "payment":false,
                        "data":date,
                        "paymentStatus":'none', // None, failed, succeeded, completed, expired
                        "products": array,
                        "total_price":sum
                    }).then(async (snapshot)=>{
                        const key = snapshot.id;
            
                        const q = query(collection(db, 'cart'), where('uid', '==', user.uid));
            
                        const querySnapshot = await getDocs(q);
                        const deletionPromises = [];
            
                        querySnapshot.forEach((docSnapshot) => {
                            const docRef = doc(db, 'cart', docSnapshot.id);
                            deletionPromises.push(deleteDoc(docRef));
                        });
            
                        await Promise.all(deletionPromises).then(()=>{
                            console.log('koniec')
                            // setLoading(false)
                            // navigate('/account/order/'+key)
                        })
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
            })
}