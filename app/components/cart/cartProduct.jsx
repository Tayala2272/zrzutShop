

  
export default function CartProduct({ name, price, amount, id, image }){
    return(
        <tr>
            <td className="cart_product">
            <a href=""><img src={"./app/assets/cart/"+image} alt="" /></a>
            </td>
            <td className="cart_description">
            <h4><a href="">{name}</a></h4>
            <p>Product ID: {id}</p>
            </td>
            <td className="cart_price">
            <p>{price}$</p>
            </td>
            <td className="cart_quantity">
            <div className="cart_quantity_button">
                <a className="cart_quantity_up" href=""> + </a>
                <input className="cart_quantity_input" type="text" name="quantity" value={amount} autoComplete="off" size={1} />
                <a className="cart_quantity_down" href=""> - </a>
            </div>
            </td>
            <td className="cart_total">
            <p className="cart_total_price">{price*amount}$</p>
            </td>
            <td className="cart_delete">
            <a className="cart_quantity_delete" href=""><i className="fa fa-times"></i></a>
            </td>
        </tr>
    )
}