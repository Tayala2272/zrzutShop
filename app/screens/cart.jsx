
import React, {useState,useEffect} from "react";

import CartProduct from "../components/cart/cartProduct";


import { AppContext } from "../hooks/firebaseContext";

import { useNavigate } from "react-router-dom";

import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51Op4sOLzgMVKU2AQnmq9hXQbMXHNQXUIrGxD1wLperpHp5USK9hSbzQEln2IjAPvAaH6Iq1LQUiJ4JFG67PtYsrW00bunOBqfL")

export default function Cart(){
    
    const [ message, setMessage ] = useState("");
    const [ isCheckoutLoading, setIsCheckoutLoading ] = useState(false)
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

      
    async function handleSubmit(method){
        // event.preventDefault()
        if(user && cart){
            const array = cart.map(x=>{
                if(lang == "pl"){
                    return {
                        "price_data":
                        {
                            "currency":"pln",
                            "unit_amount":(x.price*100*exchangeRates.PLN).toFixed(),
                            "product_data":{
                                "name":x.name,
                                "description":"Opis produktu",
                            }
                        },
                        "quantity":x.amount
                    }
                }
                if(lang == "en"){
                    return {
                        "price_data":
                        {
                            "currency":"usd",
                            "unit_amount":(x.price*100).toFixed(),
                            "product_data":{
                                "name":x.name,
                                "description":"Opis produktu",
                            }
                        },
                        "quantity":x.amount
                    }
                }
                if(lang == "ua"){
                    return {
                        "price_data":
                        {
                            "currency":"uah",
                            "unit_amount":(x.price*100*exchangeRates.UAH).toFixed(),
                            "product_data":{
                                "name":x.name,
                                "description":"Opis produktu",
                            }
                        },
                        "quantity":x.amount
                    }
                }
            })
            setIsCheckoutLoading(true);
            console.log(array)
            try {
                const stripe = await stripePromise;
                fetch('https://app-ae7icdkcxq-uc.a.run.app/create-checkout-session/'+method, {
                // fetch('http://localhost:5001/zrzutshop/us-central1/app/create-checkout-session/'+method, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(array),
                }).then(res=>res.json())
                .then(res=>window.location.href = res)                
            } catch (error) {
                // setError('Wystąpił błąd podczas tworzenia sesji płatności.');
                console.error(error);
            } finally {
                setIsCheckoutLoading(false);
            }
        }else{
            alert("Musisz się zalogować")
        }
    }


    return(
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
            
            {user && lang=="pl" && <>
                <button type="submit" onClick={()=>handleSubmit('card')}>Zapłać kartą</button>
                <button type="submit" onClick={()=>handleSubmit('klarna')}>Zapłać krypto</button>
                <button type="submit" onClick={()=>handleSubmit('blik')}>Zapłać blik</button>
                <button type="submit" onClick={()=>handleSubmit('paypal')}>Zapłać paypal</button>
            </>}

            {user && lang=="en" && <>
                <button type="submit" onClick={()=>handleSubmit('card')}>Zapłać kartą</button>
                <button type="submit" onClick={()=>handleSubmit('klarna')}>Zapłać krypto</button>
                <button type="submit" onClick={()=>handleSubmit('paypal')}>Zapłać paypal</button>
            </>}

            {user && lang=="ua" && <>
                <button type="submit" onClick={()=>handleSubmit('card')}>Zapłać kartą</button>
                <button type="submit" onClick={()=>handleSubmit('klarna')}>Zapłać krypto</button>
                <button type="submit" onClick={()=>handleSubmit('paypal')}>Zapłać paypal</button>
            </>}

            {/* <section id="do_action">
            <div className="container">
                <div className="heading">
                <h3>What would you like to do next?</h3>
                <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                </div>
                <div className="row">
                <div className="col-sm-6">
                    <div className="chose_area">
                    <ul className="user_option">
                        <li>
                        <input type="checkbox" />
                        <label>Use Coupon Code</label>
                        </li>
                        <li>
                        <input type="checkbox" />
                        <label>Use Gift Voucher</label>
                        </li>
                        <li>
                        <input type="checkbox" />
                        <label>Estimate Shipping & Taxes</label>
                        </li>
                    </ul>
                    <ul className="user_info">
                        <li className="single_field">
                        <label>Country:</label>
                        <select>
                            <option>United States</option>
                            <option>Bangladesh</option>
                            <option>UK</option>
                            <option>India</option>
                            <option>Pakistan</option>
                            <option>Ucrane</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                        </select>
                        </li>
                        <li className="single_field">
                        <label>Region / State:</label>
                        <select>
                            <option>Select</option>
                            <option>Dhaka</option>
                            <option>London</option>
                            <option>Dillih</option>
                            <option>Lahore</option>
                            <option>Alaska</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                        </select>
                        </li>
                        <li className="single_field zip-field">
                        <label>Zip Code:</label>
                        <input type="text" />
                        </li>
                    </ul>
                    <a className="btn btn-default update" href="">Get Quotes</a>
                    <a className="btn btn-default check_out" href="">Continue</a>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="total_area">
                    <ul>
                        <li>Cart Sub Total <span>$59</span></li>
                        <li>Eco Tax <span>$2</span></li>
                        <li>Shipping Cost <span>Free</span></li>
                        <li>Total <span>$61</span></li>
                    </ul>
                    <a className="btn btn-default update" href="">Update</a>
                    <a className="btn btn-default check_out" href="">Check Out</a>
                    </div>
                </div>
                </div>
            </div>
            </section> */}

        </>
    )
}