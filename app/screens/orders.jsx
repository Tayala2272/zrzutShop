

import { useEffect, useState } from "react";

import {db} from "../../firebase"
import { getDocs, collection, query, where } from "firebase/firestore"

import { Link } from "react-router-dom";

import { AppContext } from "../hooks/firebaseContext"
import { useNavigate } from "react-router-dom";


export default function Orders(){

    const [ activeOrders, setActiveOrders ] = useState([])

    const { user } = AppContext()

    const navigate = useNavigate();
    if(!user){
        navigate('/')
    }


    async function conn(database){
        const q = query(collection(db, database), where('uid', '==', user.uid));
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




    return(
        <div className="container" style={{marginTop: "60px"}}>
            <h2>Aktywne zamówienia: </h2>
            {activeOrders && activeOrders.map(x=>{
                return (
                    <Link key={x.id} to={'/account/order/'+x.id}>
                        <div 
                        style={styles.box}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}>
                            {x.total_price+"zł ------------------------ "+x.data}
                            <Link to={'/payment/card/'+x.id}><button>Zapłać kartą</button></Link>
                            <Link to={'/payment/paypal/'+x.id}><button>Zapłać Paypal</button></Link>

                        </div>
                    </Link>
                    )
            })}
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