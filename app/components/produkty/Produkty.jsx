
import { useState, useEffect } from "react";

import Sidebar from "../sidebar/sidebar"
import Produkt from "./Produkt"

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";



export default function Produkty(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function downloadProduct() {
            try {
                await getDocs(collection(db, "products")).then((res)=>{
                    res.forEach((doc)=>{
                        const price = doc.data().price
                        const name = doc.data().productName
                        const img = doc.data().thumbnailImage
                        const id = doc.id
                        setProducts([...products, {"id":id,"price":price,"name":name,"img":img}])
                    })
                    setLoading(false)
                })
            } catch (error) {
                console.error("Error downloading products:", error);
            }
        }
        downloadProduct();
    }, []);

    console.log(products)

    return (
        <div className='container'>
            <div className="row">
            
                <Sidebar/>


                {/* Produkty */}
                <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <h2 className="title text-center">Features Items</h2>
                        {loading ?<>Loading</> : products.map(product=>
                            <Produkt key={product.id} price={product.price} name={product.name} img={product.img} id={product.id}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

