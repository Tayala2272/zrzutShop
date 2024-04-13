
import React, {useState,useEffect} from "react";

import CartProduct from "../components/cart/cartProduct";


import { AppContext } from "../hooks/firebaseContext";

import { useNavigate } from "react-router-dom";

import Place_an_order from "../orders/place_an_order";


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

      
    async function handleSubmit(){
        await Place_an_order(cart,user,exchangeRates)
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
                <button type="submit" onClick={()=>handleSubmit()}>Zapłać kartą</button>
                <button type="submit" onClick={()=>handleSubmit()}>Zapłać krypto</button>
                <button type="submit" onClick={()=>handleSubmit()}>Zapłać blik</button>
                <button type="submit" onClick={()=>handleSubmit()}>Zapłać paypal</button>
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