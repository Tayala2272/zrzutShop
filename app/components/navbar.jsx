
import { Link } from "react-router-dom";

import {UserAuth} from "../hooks/auth"

export default function Navbar(){
    const { handleLogOut, user } = UserAuth()

    return(
        <header id="header">
            {/* <!-- header_top --> */}
            {/* <div className="header_top">
            <div className="container">
                <div className="row">
                <div className="col-sm-6">
                    <div className="contactinfo">
                    <ul className="nav nav-pills">
                        <li><a href="#"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
                        <li><a href="#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
                    </ul>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="social-icons pull-right">
                    <ul className="nav navbar-nav">
                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div> */}
            {/* <!-- /header_top --> */}
            
            {/* <!-- header-middle --> */}
            <div className="header-middle">
            <div className="container">
                <div className="row">
                <div className="col-sm-4">
                    <div className="logo pull-left">
                    <a href="index.html"><img src="./app/assets/home/logo.png" alt="" /></a>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="shop-menu pull-right">
                    <ul className="nav navbar-nav">
                    {user && <>
                        <li><a href="#"><i className="fa fa-user"></i> Account</a></li>
                        <li><a href="#"><i className="fa fa-star"></i> Wishlist</a></li>
                        <li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
                        <li><Link to="/cart"><i className="fa fa-shopping-cart"></i> Cart</Link></li>
                    </>}
                        {user ? <li><a onClick={()=>handleLogOut()} style={{cursor:"pointer"}}><i className="fa fa-lock"></i> Log Out</a></li> : <li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>}
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
            {/* <!-- /header-middle --> */}
            
            {/* <!-- header-bottom --> */}
            <div className="header-bottom">
            <div className="container">
                <div className="row">
                <div className="col-sm-9">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    </div>
                    <div className="mainmenu pull-left">
                    <ul className="nav navbar-nav collapse navbar-collapse">
                        <li><Link to="/">Home</Link></li>
                        <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                        <ul role="menu" className="sub-menu">
                            <li><a href="shop.html">Products</a></li>
                            <li><a href="product-details.html">Product Details</a></li> 
                            <li><a href="checkout.html">Checkout</a></li> 
                            <li><Link to="/cart">Cart</Link></li> 
                            <li><Link to="/login">Login</Link></li> 
                        </ul>
                        </li> 
                        <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down"></i></a>
                        <ul role="menu" className="sub-menu">
                            <li><a href="blog.html">Blog List</a></li>
                            <li><a href="blog-single.html">Blog Single</a></li>
                        </ul>
                        </li> 
                        <li><a href="404.html">404</a></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
            {/* <!-- /header-bottom --> */}
        </header>
    )
}