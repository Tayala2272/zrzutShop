

import { Link } from "react-router-dom";
  
export default function CartProduct({ name, price, amount, id, image, lang, exchangeRates }){
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
                {lang=="pl" && <p>{(exchangeRates.PLN * price).toFixed(2)+"zł"}</p>}
                {lang=="en" && <p>{price+"$"}</p>}
                {lang=="ua" && <p>{(exchangeRates.UAH * price).toFixed(2)+"₴"}</p>}
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
                <p className="cart_total_price">
                    {lang=="pl" && (exchangeRates.PLN * price).toFixed(2)+"zł"}
                    {lang=="en" && price+"$"}
                    {lang=="ua" && (exchangeRates.UAH * price).toFixed(2)+"₴"}
                </p>
            </td>
            <td className="cart_delete">
                <a className="cart_quantity_delete" href=""><i className="fa fa-times"></i></a>
            </td>
        </tr>
    )
}