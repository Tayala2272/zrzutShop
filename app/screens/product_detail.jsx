import { useState ,useEffect } from "react";
import { getDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

// import Sidebar from "../components/sidebar/sidebar";

// import Fancybox from 'fancybox';

import ImageGrid from "../components/produkty/imageGrid";

import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


export default function Product_detail(){
    const [images, setImages] = useState([]);
    const { productId } = useParams();
    
    const navigate = useNavigate();
    useEffect(() => {
        async function downloadProduct() {
            try {
                const docRef = doc(db, "products", productId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const imageNames = docSnap.data().otherImages;
                    const imageUrlArray = await Promise.all(imageNames.map(async (imageName) => {
                        const imageUrl = await getDownloadURL(ref(storage, `products/${imageName}`));
                        return imageUrl;
                    }));
                    setImages(imageUrlArray);
                } else {
                    navigate('/error/'+productId)
                }
            } catch (error) {
                console.error("Error downloading images:", error);
            }
        }
        downloadProduct();
    }, [productId]);

    const [image, setImage] = useState("images/product-details/1.jpg")


    function changeImage(img){
        setImage(img)
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
                                <ImageGrid event={changeImage} images={images}/>

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