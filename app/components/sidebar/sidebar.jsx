

import Categories from '../sidebar/categories';

import Slider from '@mui/material/Slider';
import { Link } from "react-router-dom";

export default function Sidebar({max}){
    function roundUpTo10(liczba) {
        return Math.ceil(liczba / 10) * 10;
    }
    const endMax = roundUpTo10(max)

    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Kategorie</h2>
                {/* Kategoria rozwijana */}
                    <Categories/>


                {/* <div className="brands_products">
                <h2>Brands</h2>
                <div className="brands-name">
                    <ul className="nav nav-pills nav-stacked">
                    <li><a href=""> <span className="pull-right">(50)</span>Acne</a></li>
                    <li><a href=""> <span className="pull-right">(43)</span>Nike</a></li>
                    <li><a href=""> <span className="pull-right">(32)</span>Chuj</a></li>
                    </ul>
                </div>
                </div> */}
                <div className="price-range">
                    <h2>Zakres Ceny</h2>
                    <div className="well">
                    <Slider
                        aria-label="Temperature"
                        defaultValue={endMax}
                        getAriaValueText={(val)=>{return val}}
                        valueLabelDisplay="auto"
                        shiftStep={30}
                        step={10}
                        min={0}
                        max={endMax}
                    />
                    <br />
                    <b>0 zł</b> <b className="pull-right">{endMax} zł</b>
                    </div>
                </div>
                <div className="shipping text-center">
                <img alt="miejsce na reklame" />
                </div>
            </div>
        </div>
    )
}