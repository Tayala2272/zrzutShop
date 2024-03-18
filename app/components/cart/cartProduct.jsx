

import { Link } from "react-router-dom";
  
export default function CartProduct({ name, price, amount, id, image }){
    return(
        <tr>
            <td className="cart_product">
                <Link to={"/product/"+id}><img style={{width:"150px"}} src={image} alt="" /></Link>
            </td>
            <td className="cart_description">
                <h4><Link to={"/product/"+id}>{name}</Link></h4>
                <p>Product ID: {id}</p>
            </td>
            <td className="cart_price">
                <p>{price}zł</p>
            </td>
            <td className="cart_quantity">
                <div className="cart_quantity_button">
                    <a className="cart_quantity_up" href=""> + </a>
                    <div className="cart_quantity_input" style={{margin:"0 10px"}}>{amount}</div>
                    {/* <input className="cart_quantity_input" type="text" name="quantity" value={amount} autoComplete="off" size={1} /> */}
                    <a className="cart_quantity_down" href=""> - </a>
                </div>
            </td>
            <td className="cart_total">
                <p className="cart_total_price">{price*amount}zł</p>
            </td>
            <td className="cart_delete">
                <a className="cart_quantity_delete" href=""><i className="fa fa-times"></i></a>
            </td>
        </tr>
    )
}