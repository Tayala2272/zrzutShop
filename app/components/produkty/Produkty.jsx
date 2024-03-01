

import Slider from '@mui/material/Slider';
import Produkt from "./Produkt"


export default function Produkty(){
    return (
        <div className='container'>
            <div className="row">
                <div className="col-sm-3">
                    <div className="left-sidebar">
                        <h2>Category</h2>
                        <div className="panel-group category-products" id="accordian">
                        {/* Kategoria rozwijana */}
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                        <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                        Sportswear
                                        </a>
                                    </h4>
                                </div>
                                <div id="sportswear" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <ul>
                                    <li><a href="">Nike </a></li>
                                    {/* Pozostałe elementy */}
                                    </ul>
                                </div>
                                </div>
                            </div>
                        {/* Pojedyńcza kategoria */}
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title"><a href="#">Kids</a></h4>
                                </div>
                            </div>
                        


                        </div>
                        <div className="brands_products">
                        <h2>Brands</h2>
                        <div className="brands-name">
                            <ul className="nav nav-pills nav-stacked">
                            <li><a href=""> <span className="pull-right">(50)</span>Acne</a></li>
                            <li><a href=""> <span className="pull-right">(43)</span>Nike</a></li>
                            <li><a href=""> <span className="pull-right">(32)</span>Chuj</a></li>
                            {/* Pozostałe marki */}
                            </ul>
                        </div>
                        </div>
                        <div className="price-range">
                            <h2>Price Range</h2>
                            <div className="well">
                            <Slider
                                aria-label="Temperature"
                                defaultValue={600}
                                getAriaValueText={(val)=>{return val}}
                                valueLabelDisplay="auto"
                                shiftStep={30}
                                step={10}
                                min={0}
                                max={600}
                            />
                            <br />
                            <b>$ 0</b> <b className="pull-right">$ 600</b>
                            </div>
                        </div>
                        <div className="shipping text-center">
                        <img src="images/home/shipping.jpg" alt="" />
                        </div>
                    </div>
                </div>


                {/* Produkty */}
                <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <h2 className="title text-center">Features Items</h2>
                        <Produkt price="50$" name="Koszulka" img="product12.jpg" id="12"/>
                        <Produkt price="50$" name="Koszulka" img="product12.jpg" id="12"/>
                        <Produkt price="50$" name="Koszulka" img="product12.jpg" id="12"/>
                        <Produkt price="50$" name="Koszulka" img="product12.jpg" id="12"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

