import { useState ,useEffect } from "react";
import { getDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

import { AppContext } from "../hooks/firebaseContext";

// import Sidebar from "../components/sidebar/sidebar";

// import Fancybox from 'fancybox';

import ImageGrid from "../components/produkty/imageGrid";

import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AddToCart from "../components/cart/addToCart";

import angle_left from "../assets/svg/angle-left.svg"
import angle_right from "../assets/svg/angle-right.svg"



export default function Product_detail(){
    const { user, lang, exchangeRates } = AppContext()


    const [ images, setImages] = useState([]);
    const [ product, setProduct ] = useState()
    const [ amount, setAmount ] = useState(1)
    const [ stripeId, setStripeId ] = useState('')

    const [ SolidpricePLN, setSolidPricePLN ] = useState(0)
    const [ SolidpriceUSD, setSolidPriceUSD ] = useState(0)
    const [ SolidpriceUAH, setSolidPriceUAH ] = useState(0)
    const [ pricePLN, setPricePLN ] = useState(0)
    const [ priceUSD, setPriceUSD ] = useState(0)
    const [ priceUAH, setPriceUAH ] = useState(0)

    const [ loading, setLoading ] = useState(true)

    const [ thumbnailImg, setThumbnailImg ] = useState("")
    const { productId } = useParams();
    
    const navigate = useNavigate();
    useEffect(() => {
        async function downloadProduct() {
            if(exchangeRates && productId){
                try {
                    const docRef = doc(db, "products", productId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const imageNames = docSnap.data().otherImages;
                        await Promise.all(imageNames.map(async (imageName) => {
                            const imageUrl = await getDownloadURL(ref(storage, `resized_products/${imageName}_500x500.jpeg`));
                            return imageUrl;
                        })).then(async (imageUrlArray)=>{
                            const tmp = docSnap.data()
                            setProduct(tmp)
                            setPriceUSD(tmp.price_USD)
                            setPricePLN((tmp.price_USD * exchangeRates.PLN).toFixed(2))
                            setPriceUAH((tmp.price_USD * exchangeRates.UAH).toFixed(2))
                            setSolidPriceUSD(tmp.price_USD)
                            setSolidPricePLN((tmp.price_USD * exchangeRates.PLN).toFixed(2))
                            setSolidPriceUAH((tmp.price_USD * exchangeRates.UAH).toFixed(2))
                            setImages(imageUrlArray)
                            // setStripeId(tmp.stripeID)
                            await getDownloadURL(ref(storage, `resized_products/${tmp.thumbnailImage}_500x500.jpeg`)).then((tmp)=>{
                                setThumbnailImg(tmp)
                                setImages([tmp, ...imageUrlArray])
                                setImage(tmp)
                                setLoading(false)
                            })
                        });
                    } else {
                        navigate('/error/'+productId)
                    }
                } catch (error) {
                    console.error("Error downloading images:", error);
                }
            }
        }
        downloadProduct();
    }, [exchangeRates]);

    const [image, setImage] = useState("")


    function changeImage(img){
        setImage(img)
    }

    function handleSubmit(event){
        event.preventDefault()
        if(lang=="pl"){
            AddToCart(productId,amount,user,(pricePLN/exchangeRates.PLN).toFixed(2),product.productNamePL,thumbnailImg).then(res=>alert(res)).catch(err=>alert(err))
        }
        if(lang=="en"){
            AddToCart(productId,amount,user,priceUSD,product.productNameEN,thumbnailImg).then(res=>alert(res)).catch(err=>alert(err))
        }
        if(lang=="ua"){
            AddToCart(productId,amount,user,(priceUAH/exchangeRates.UAH).toFixed(2),product.productNameUA,thumbnailImg).then(res=>alert(res)).catch(err=>alert(err))
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
                                <ImageGrid event={changeImage} images={images}/>

                            {/* Controls */}
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                                <img style={{width:'30px'}} src={angle_left} alt="arrow"/>
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                                <img style={{width:'30px'}} src={angle_right} alt="arrow"/>
                            </a>
                        </div>

                    </div>
                    <div className="col-sm-7">
                        <form className="product-information" onSubmit={handleSubmit}>
                            <h2>
                                {product && lang=="pl" && product.productNamePL}
                                {product && lang=="en" && product.productNameEN}
                                {product && lang=="ua" && product.productNameUA}
                            </h2>
                            <p>Id produktu: {loading==false && productId}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                <span style={{width:"100%"}}>{loading==false && lang=="pl" && SolidpricePLN+"zł"}{loading==false && lang=="en" && SolidpriceUSD+"$"}{loading==false && lang=="ua" && SolidpriceUAH+"₴"}</span>
                                <div style={{marginBottom:'10px'}}>
                                    <label style={{width:'100px'}}>Quantity:</label>
                                    <input type="number" defaultValue="1" min={1} step={1} onChange={(num)=>setAmount(parseInt(num.target.value))}/>
                                </div>

                                <div style={{margin:'0 0 20px 0'}}>
                                    <label style={{width:'100px'}}>Price:</label>
                                    {lang && lang=="pl" && <input style={{width:'100px'}} type="number" step={0.01} value={loading==false && pricePLN} min={SolidpricePLN} onChange={(num)=>setPricePLN(parseFloat(num.target.value))}/>}
                                    {lang && lang=="en" && <input style={{width:'100px'}} type="number" step={0.01} value={loading==false && priceUSD} min={SolidpriceUSD} onChange={(num)=>setPriceUSD(parseFloat(num.target.value))}/>}
                                    {lang && lang=="ua" && <input style={{width:'100px'}} type="number" step={0.01} value={loading==false && priceUAH} min={SolidpriceUAH} onChange={(num)=>setPriceUAH(parseFloat(num.target.value))}/>}
                                    
                                </div>

                                <button type="submit" className="btn btn-fefault cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    Add to cart
                                </button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> New</p>
                            <p><b>Brand:</b> {product && <>product.brand</>}</p>
                            <a href=""><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                        </form>
                    </div>
                </div>

                <div className="category-tab shop-details-tab">

                    {product && <div dangerouslySetInnerHTML={{ __html: product.opisPL }} ></div>}


                    <div style={{margin:"110px 0 90px 0"}} id="details">
                        {product &&
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Tytuł</th>
                                    <th style={styles.th}>Kontent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product && lang=="pl" && product.details.map((item) => (
                                    <tr key={item.titlePL} style={styles.tr}>
                                        <td style={{...styles.td,textAlign:"right"}}>{item.titlePL}</td>
                                        <td style={styles.td}>{item.contentPL}</td>
                                    </tr>
                                ))}
                                {product && lang=="en" && product.details.map((item) => (
                                    <tr key={item.titleEN} style={styles.tr}>
                                        <td style={{...styles.td,textAlign:"right"}}>{item.titleEN}</td>
                                        <td style={styles.td}>{item.contentEN}</td>
                                    </tr>
                                ))}
                                {product && lang=="ua" && product.details.map((item) => (
                                    <tr key={item.titleUA} style={styles.tr}>
                                        <td style={{...styles.td,textAlign:"right"}}>{item.titleUA}</td>
                                        <td style={styles.td}>{item.contentUA}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                    <div style={{margin:"90px 0"}} id="companyprofile">
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
                    <div style={{margin:"90px 0"}} id="reviews">
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
    )
}

const styles = {
    table: {
        margin: "1%",
        width: "98%",
        borderCollapse: "collapse",
    },
    th: {
        backgroundColor: "#f0f0f0",
        textAlign: "center",
    },
    tr: {
        border: "1px solid gray",
    },
    td: {
        padding: "10px",
        border: "solid 1px gray",
    },
  };
