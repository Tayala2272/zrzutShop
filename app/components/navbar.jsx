
import { Link } from "react-router-dom";

import { AppContext } from "../hooks/firebaseContext";

import { useTranslation } from "react-i18next";

// Images
    import logo from "../assets/logo.png"
    import account from "../assets/svg/account.svg"
    import cart_svg from "../assets/svg/cart.svg"
    import logout from "../assets/svg/log-out.svg"
    import add_svg from "../assets/svg/add.svg"

export default function Navbar(){
    const { handleLogOut, user, cart, changeLanguage, admin } = AppContext();
    const { t } = useTranslation()

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
                    <a href="index.html"><img src={logo} alt=""/></a>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="shop-menu pull-right">
                    <ul className="nav navbar-nav">
                    {user && <>
                        <li style={{textAlign:"center"}}>
                            <Link to="/account"><img style={{width:"22px"}} src={account} alt="icon"/>
                            <br/>Account</Link>
                        </li>
                        {/* <li style={{textAlign:"center"}}>
                            <Link to="/"><img style={{width:"22px"}} src="https://firebasestorage.googleapis.com/v0/b/zrzutshop.appspot.com/o/svg%2Faccount.svg?alt=media&token=de705bbb-9ea6-4df0-93bc-7986efda7231" alt="icon"/>
                            <br/>Wishlist</Link>
                        </li> */}
                        <li style={{textAlign:"center"}}>
                            <Link to="/cart"><img style={{width:"22px"}} src={cart_svg} alt="icon"/>
                            <br/>Koszyk {cart && <sup>({cart.length})</sup>}</Link>
                        </li>
                        {/* Admin section */}
                        {admin && 
                            <li style={{textAlign:"center"}}>
                                <Link to="/add-product"><img style={{width:"22px"}} src={add_svg} alt="icon"/>
                                <br/>Dodaj produkt</Link>
                            </li>}
                    </>}
                        {/* Przycisk od logowania i wylogowywania */}
                        {user ? 
                            <li style={{textAlign:"center"}}>
                                <a onClick={()=>handleLogOut()} style={{cursor:"pointer"}}>
                                    <img style={{width:"22px"}} src={logout} alt="icon"/>
                                    <br/>Wyloguj się
                                </a>
                            </li> 
                            : 
                            <li style={{textAlign:"center"}}>
                                <Link to="/login"><img style={{width:"22px"}} src={account} alt="icon"/>
                                <br/>Zaloguj się</Link>
                            </li>}
                            <li>
                                <a style={{cursor:"pointer",margin:"0"}} onClick={()=>changeLanguage("pl")}>Polski</a>
                                <a style={{cursor:"pointer",margin:"0"}} onClick={()=>changeLanguage("en")}>English</a>
                                <a style={{cursor:"pointer",margin:"0"}} onClick={()=>changeLanguage("ua")}>українська</a>
                            </li>
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
                        <li><Link to="/">{t('home page')}</Link></li>
                        <li><Link to="/shop">Produkty</Link></li>
                        <li><Link to="/about">O nas</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
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