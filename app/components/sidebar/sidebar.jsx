

import Categories from '../sidebar/categories';

import Slider from '@mui/material/Slider';

export default function Sidebar(){
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Category</h2>
                {/* Kategoria rozwijana */}
                    <Categories/>


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
    )
}