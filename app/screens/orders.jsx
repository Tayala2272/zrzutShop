

import { useEffect, useState } from "react";

import {db} from "../../firebase"
import { getDocs, collection, query, where, orderBy } from "firebase/firestore"

import { Link } from "react-router-dom";

import { AppContext } from "../hooks/firebaseContext"
import { useNavigate } from "react-router-dom";

import Pay from "../orders/pay";

export default function Orders(){

    const [ activeOrders, setActiveOrders ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const { user,lang,exchangeRates } = AppContext()

    const navigate = useNavigate();
    if(!user){
        navigate('/')
    }


    async function conn(database){
        const q = query(collection(db, database), where('uid', '==', user.uid), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const ordersArray = [];
        querySnapshot.forEach((doc) => {
            ordersArray.push({ id: doc.id, ...doc.data() });
        });
        setActiveOrders(ordersArray);
    }

    useEffect(()=>{

        if(user.uid){
            if(typeof user.uid!='undefined'){
                conn('orders')
            }
        }
    },[user])

    async function payment(user,lang,exchangeRates,method,id){
        setLoading(true)
        const res = await Pay(user,lang,exchangeRates,method,id)
        if(res){
            setLoading(false)
            console.log(res)
            window.location.href = res
        }
    }




    return(
        <div className="container" style={{marginTop: "60px"}}>
            {loading ? <>Loading</>
                : 
                <>
                    <h2>Aktywne zamówienia: </h2>
                    {activeOrders && activeOrders.map(x=>{
                        return (
                                <div  key={x.id}
                                style={styles.box}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}>

                                    
                                    <Link to={'/account/order/'+x.id}>
                                            {x.total_price+"zł ------------------------ "+x.data}<br></br>
                                    </Link>

                                    {/* Nie zapłacono jeszcze */}
                                        {x.paymentStatus=="none" ? <>
                                            <button onClick={()=>payment(user,lang,exchangeRates,'card',x.id)}>Zapłać kartą</button>
                                            <button onClick={()=>payment(user,lang,exchangeRates,'paypal',x.id)}>Zapłać Paypal</button></> : <></>}

                                    {/* Przetwarzanie płatności */}
                                        {x.paymentStatus=="checkout_expired" ? <>
                                            <button onClick={()=>payment(user,lang,exchangeRates,'card',x.id)}>Zapłać kartą</button>
                                            <button onClick={()=>payment(user,lang,exchangeRates,'paypal',x.id)}>Zapłać Paypal</button></> : <></>}

                                    {/* Zapłacono */}
                                        {x.paymentStatus=="checkout_succeeded"? <>Przetwarzanie płatności</> : <></>}

                                    {/* amount_capturable_updated */}
                                        {x.paymentStatus=="checkout_completed"? <>Przetwarzanie płatności</> : <></>}

                                    {/* payment_failed */}
                                        {x.paymentStatus=="checkout_failed"? <>
                                            <button onClick={()=>payment(user,lang,exchangeRates,'card',x.id)}>Zapłać kartą</button>
                                            <button onClick={()=>payment(user,lang,exchangeRates,'paypal',x.id)}>Zapłać Paypal</button></> : <></>}


                                    {/* payment_failed */}
                                        {x.paymentStatus=="payment_canceled"? <>Płatność anulowana</> : <></>}

                                    {/* payment_succeeded */}
                                        {x.paymentStatus=="payment_failed"? <>Wystąpił błąd podczas płatności</> : <></>}

                                    {/* payment_succeeded */}
                                        {x.paymentStatus=="payment_processing"? <>Pzetwarzanie płatności</> : <></>}

                                    {/* payment_succeeded */}
                                        {x.paymentStatus=="payment_requiresAction"? <>Płatność wymaga akceptacji</> : <></>}

                                    {/* payment_succeeded */}
                                        {x.paymentStatus=="payment_succeeded"? <>Płatność zrealizowana pomyślnie</> : <></>}

                                </div>
                            )
                    })}
                </>
            }
        </div>
    )
}


const styles = {
    box:{
        transition: 'all 0.2s ease-in-out',
        width:'100%',
        marginTop:'50px',
    }
}