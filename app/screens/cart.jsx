
import React, {useState,useEffect} from "react";

import CartProduct from "../components/cart/cartProduct";


import { AppContext } from "../hooks/firebaseContext";

import { useNavigate } from "react-router-dom";


export default function Cart(){
    
    const [ message, setMessage ] = useState("");

    const { cart, user } = AppContext()

    
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            alert("Order placed! You will receive an email confirmation.");
        }
        if (query.get("canceled")) {
            alert("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, []);

      
    async function handleSubmit(event){
        event.preventDefault()
        if(user && cart){
            const array = cart.map(x=>{return {"stripeId":x.stripeId,"price":x.price}})
            console.log(array)
            // try {
            //     const stripe = await stripePromise;
            //     const response = await fetch('http://localhost:5001/zrzutshop/us-central1/app/create-checkout-session/'+user.uid, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             productId,
            //             customPrice,
            //         }),
            //     });
            //     const session = await response.json();
            //     await stripe.redirectToCheckout({
            //         sessionId: session.id,
            //     });
            // } catch (error) {
            //     setError('Wystąpił błąd podczas tworzenia sesji płatności.');
            //     console.error(error);
            // } finally {
            //     setIsCheckoutLoading(false);
            // }
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
                            cart.map(item=>{return <CartProduct key={item.id} name={item.name} price={item.price} amount={item.amount} id={item.id} image={item.img}/>})
                        }
                    </tbody>
                </table>
                </div>
            </div>
            </section>
            
            {user && <>
            
                <form onSubmit={handleSubmit}>
                    <button type="submit">Checkout</button>
                </form>

                {/* <form action={"http://localhost:5001/zrzutshop/us-central1/app/create-product/"+user.uid} method="POST">
                    <button type="submit">Dodaj</button>
                </form> */}
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