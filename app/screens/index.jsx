
import Produkty from "../components/produkty/Produkty"

import undraw from "../assets/undraw.png"

export default function Index(){
    return (
        <>
            <section id="slider">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-12">
                        <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
                            <li data-target="#slider-carousel" data-slide-to="1"></li>
                            <li data-target="#slider-carousel" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="item active">
                            <div className="col-sm-6">
                                <h1>Zozula<span>Drop</span></h1>
                                <h2>Tekst</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                <button type="button" className="btn btn-default get">Kup teraz</button>
                            </div>
                            <div className="col-sm-6">
                                <img src={undraw} className="girl img-responsive" alt="" />
                                {/* <img src="images/home/pricing.png" className="pricing" alt="" /> */}
                            </div>
                            </div>
                            <div className="item">
                            <div className="col-sm-6">
                                <h1>Zozula<span>Drop</span></h1>
                                <h2>Tekst</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                <button type="button" className="btn btn-default get">Kup teraz</button>
                            </div>
                            <div className="col-sm-6">
                                <img src={undraw} className="girl img-responsive" alt="" />
                                {/* <img src="images/home/pricing.png" className="pricing" alt="" /> */}
                            </div>
                            </div>
                            <div className="item">
                            <div className="col-sm-6">
                                <h1>Zozula<span>Drop</span></h1>
                                <h2>Tekst</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                <button type="button" className="btn btn-default get">Kup teraz</button>
                            </div>
                            <div className="col-sm-6">
                                <img src={undraw} className="girl img-responsive" alt="" />
                                {/* <img src="images/home/pricing.png" className="pricing" alt="" /> */}
                            </div>
                            </div>
                        </div>
                        <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}