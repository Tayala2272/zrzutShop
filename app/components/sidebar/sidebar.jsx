

import Categories from '../sidebar/categories';

import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Sidebar({max, lang, exchangeRates, returnMaxPrice}){
    const [maxPrice, setMaxPrice] = useState(0)

    function roundUpTo10(liczba) {
        return Math.ceil(liczba / 10) * 10;
    }
    useEffect(()=>{
        if(lang=='pl'){
            setMaxPrice(roundUpTo10((max)*exchangeRates.PLN))
        }
        else if(lang=='ua'){
            setMaxPrice(roundUpTo10((max)*exchangeRates.UAH))
        }
        else{
            setMaxPrice(roundUpTo10((max)))
        }
    },[max,lang])

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
                    {maxPrice!=0 ? 
                        <>Filtr ceny</>
                        :<>Loading</>
                    }
                    <br />
                    <b>0 zł</b> <b className="pull-right">{maxPrice} {lang && lang=="pl" && <>zł</>}{lang && lang=="ua" && <>₴</>}{lang && lang=="en" && <>$</>}</b>
                    </div>
                </div>
                <div className="shipping text-center">
                <img alt="miejsce na reklame" />
                </div>
            </div>
        </div>
    )
}