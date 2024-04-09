
import logo from "../assets/logo.png"

export default function Footer(){
    return(
        <>
            <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                        <div className="companyinfo">
                            <img src={logo} alt="logo"/>
                        </div>
                        </div>
                        <div className="col-sm-7"></div>
                        {/* <div className="col-sm-3">
                        <div className="address">
                            <img src="./app/assets/home/map.png" alt="" />
                            <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
                        </div>
                        </div> */}
                    </div>
                    </div>
                </div>

                <div className="footer-widget" style={{marginBottom:"0",paddingBottom:"100px"}}>
                    <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-2">
                        <div className="single-widget">
                            <h2>Zapisz się do newsletter</h2>
                            <form action="#" className="searchform">
                            <input type="text" placeholder="Twój adres email" />
                            <button type="submit" className="btn btn-default"><i className="fa fa-arrow-circle-o-right"></i></button>
                            <p>Zapisz się do newslettera, a będzie dostawać <br/> wiadomości o najnowszych promocjach!</p>
                            </form>
                        </div>
                        </div>
                        <div className="col-sm-4 col-sm-offset-1">
                        <h2 className="title text-center">Kontakt</h2>
                        <address className="text-center">
                            <p>Katowice: Polska</p>
                            <p>Phone: (+48) 000 000 000</p>
                            <p>Email: mail@gmail.com</p>
                        </address>
                        </div>
                    </div>
                    </div>
                </div>
            </footer>
        </>
    )
}