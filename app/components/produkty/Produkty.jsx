

import Sidebar from "../sidebar/sidebar"
import Produkt from "./Produkt"



export default function Produkty(){

    return (
        <div className='container'>
            <div className="row">
            
                <Sidebar/>


                {/* Produkty */}
                <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <h2 className="title text-center">Features Items</h2>
                        <Produkt price="50$" name="Koszulka" img="gallery1.jpg" id="12"/>
                        <Produkt price="50$" name="Koszulka" img="gallery2.jpg" id="12"/>
                        <Produkt price="50$" name="Koszulka" img="gallery3.jpg" id="12"/>
                        <Produkt price="50$" name="Koszulka" img="gallery4.jpg" id="12"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

