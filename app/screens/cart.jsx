
import React, {useState,useEffect} from "react";

import CartProduct from "../components/cart/cartProduct";


import { AppContext } from "../hooks/firebaseContext";

import { useNavigate, Link } from "react-router-dom";

import Place_an_order from "../orders/place_an_order";



export default function Cart(){
    
    const [ message, setMessage ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false)
    const { cart, user, lang, exchangeRates } = AppContext()

    
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            alert("Złożono zamówienie!");
        }
        if (query.get("canceled")) {
            alert("Zamówienie anulowane");
        }
    }, []);

      
    const navigate = useNavigate();
    async function handleSubmit(){
        setIsLoading(true)
        await Place_an_order(cart,user).then(()=>{
            setIsLoading(false)
            navigate('/account/orders')
        })
    }




    return(
        <>
            {cart.length > 0 ? 
                <>
                    <section id="cart_items">
                        <div className="container">
                            <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                                <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description"></td>
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                    {cart &&
                                        cart.map(item=>{return <CartProduct key={item.id} name={item.name} price={item.price} amount={item.amount} id={item.id} image={item.img} lang={lang} exchangeRates={exchangeRates}/>})
                                    }
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </section>
                    
                    {user && <>
                        <button type="submit" onClick={()=>handleSubmit()}>Złóż zamówienie</button>
                    </>}

                    <section id="do_action">
                        <div className="container">
                            <a className="btn btn-default check_out" href="">Continue</a>
                        </div>
                    </section>

                </> : 
                // Jeśli nie ma produktów w koszyku
                <>
                    <div className="container" style={{marginBottom:"200px",marginTop:"100px"}}>
                        <Link to={"/shop"}><h2>Dodaj produkty do koszyka</h2></Link>
                    </div>
                </>
            }
        </>
    )
}