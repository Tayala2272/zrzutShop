import { useState } from "react";

import { storage, db } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, onSnapshot } from "firebase/firestore";

// import Sidebar from "../components/sidebar/sidebar";

// import Fancybox from 'fancybox';

import { useParams } from 'react-router-dom'


export default function Product_detail(){

    const [image, setImage] = useState("images/product-details/1.jpg")
    const [images, setImages] = useState([])


    function changeImage(img){
        setImage(img)
    }

    const { productId } = useParams();

    onSnapshot(doc(db, "products", productId), (doc) => {
        console.log(doc.data().otherImages)
        // doc.data().otherImages.forEach(item => {
        //     console.log(item)
        //     getDownloadURL(ref(storage, "products/"+item)).then(
        //         (res)=>{
        //             setImages([...images, res])
        //             console.log(images)
        //         }
        //     )
        // }).then(()=>getImages());
    });

    const imageChunks = []

    function getImages(){
        for (let i = 0; i < images.length; i += 4) {
            const chunk = images.slice(i, i + 4);
        
            imageChunks.push(
                <div key={i} className="item">
                    {chunk.map((image, index) => (
                        <a key={index} style={{cursor:'pointer'}} onClick={()=>changeImage({image})}>
                            <img src={image} alt="" />
                        </a>
                    ))}
                </div>
            );
        }
    }



    return (
        <div className="container">
            
            {/* <Sidebar/> */}

            <div className="col-sm-12 padding-right">
                <div className="product-details">
                    <div className="col-sm-5">
                        <div className="view-product">
                            <img src={image} alt=""/>
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                            {/* Wrapper for slides */}
                                {imageChunks}
                            {/* <div className="carousel-inner">
                                <div className="item active">
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar1.jpg")}><img src="images/product-details/similar1.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar2.jpg")}><img src="images/product-details/similar2.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar3.jpg")}><img src="images/product-details/similar3.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar3.jpg")}><img src="images/product-details/similar3.jpg" alt="" /></a>
                                </div>
                                <div className="item">
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar1.jpg")}><img src="images/product-details/similar1.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar2.jpg")}><img src="images/product-details/similar2.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar3.jpg")}><img src="images/product-details/similar3.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar3.jpg")}><img src="images/product-details/similar3.jpg" alt="" /></a>
                                </div>
                                <div className="item">
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar1.jpg")}><img src="images/product-details/similar1.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar2.jpg")}><img src="images/product-details/similar2.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar3.jpg")}><img src="images/product-details/similar3.jpg" alt="" /></a>
                                    <a style={{cursor:"pointer"}} onClick={()=>changeImage("images/product-details/similar3.jpg")}><img src="images/product-details/similar3.jpg" alt="" /></a>
                                </div>
                            </div> */}

                            {/* Controls */}
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </div>

                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">
                            <h2></h2>
                            <p>Id produktu: {productId}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                <span>US $59</span>
                                <label>Quantity:</label>
                                <input type="text" defaultValue="3" />
                                <button type="button" className="btn btn-fefault cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    Add to cart
                                </button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> New</p>
                            <p><b>Brand:</b> E-SHOPPER</p>
                            <a href=""><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                        </div>
                    </div>
                </div>

                <div className="category-tab shop-details-tab">
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                            <li><a href="#details" data-toggle="tab">Details</a></li>
                            <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                            <li><a href="#tag" data-toggle="tab">Tag</a></li>
                            <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade" id="details">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery1.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery2.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery3.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery4.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="companyprofile">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery1.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery3.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery2.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery4.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tag">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery1.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery2.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery3.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/gallery4.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade active in" id="reviews">
                            <div className="col-sm-12">
                                <ul>
                                    <li><a href=""><i className="fa fa-user"></i>EUGEN</a></li>
                                    <li><a href=""><i className="fa fa-clock-o"></i>12:41 PM</a></li>
                                    <li><a href=""><i className="fa fa-calendar-o"></i>31 DEC 2014</a></li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <p><b>Write Your Review</b></p>
                                
                                <form action="#">
                                    <span>
                                        <input type="text" placeholder="Your Name"/>
                                        <input type="email" placeholder="Email Address"/>
                                    </span>
                                    <textarea name="" ></textarea>
                                    <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                    <button type="button" className="btn btn-default pull-right">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}