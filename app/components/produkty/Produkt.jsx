


export default function Produkt({ price, name, img, id }){
    return (
        <div className="col-sm-4">
            <a href="#">
                <div className="product-image-wrapper">
                    <div className="single-products">
                    <div className="productinfo text-center">
                        <img src={"../../../images/shop/"+img} alt="" />
                        <h2>{price}</h2>
                        <p>{name} {id}</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                    </div>
                    <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                        <li><a href=""><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                    </ul>
                    </div>
                </div>
            </a>
        </div>
    )
}