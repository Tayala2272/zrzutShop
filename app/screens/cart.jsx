import Navbar from "../components/navbar";
import CartProduct from "../components/cart/cartProduct";

export default function Cart(){
    return(
        <>
            <Navbar/>


            <section id="cart_items">
            <div className="container">
                <div className="breadcrumbs">
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li className="active">Shopping Cart</li>
                </ol>
                </div>
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
                        <CartProduct name="Colorblock Scuba" price={59} amount={2} id={55952} image="one.png"/>
                        <CartProduct name="Colorblock Scuba" price={23} amount={1} id={33952} image="two.png"/>
                        <CartProduct name="Colorblock Scuba" price={99} amount={5} id={22952} image="three.png"/>
                    </tbody>
                </table>
                </div>
            </div>
            </section>
            

        </>
    )
}