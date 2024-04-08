
import { useState } from "react";
import { storage } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

import { Link } from "react-router-dom";

// Create a reference with an initial file path and name

export default function Produkt({ price, name, img, id }){
    const [image,setImage] = useState("")
    getDownloadURL(ref(storage, "products/"+img)).then(
        (res)=>{
            setImage(res)
        }
    )
    return (
        <div className="col-sm-4 zoomIn" style={{}}>
            <Link to={"/product/"+id}>
                <div className="product-image-wrapper">
                    <div className="single-products">
                    <div className="productinfo text-center">
                        <img src={image} alt="" />
                        <h2 style={{color:"black"}}>{price}$</h2>
                        <p>{name}</p>
                        {/* <a href="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a> */}
                    </div>
                    </div>
                    <div className="choose">
                    {/* <ul className="nav nav-pills nav-justified">
                        <li><a href=""><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                    </ul> */}
                    </div>
                </div>
            </Link>
        </div>
    )
}