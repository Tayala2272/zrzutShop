
import { useState, useEffect } from "react";

import { useParams } from 'react-router-dom'

import Sidebar from "../sidebar/sidebar"
import Produkt from "./Produkt"

import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";



export default function Produkty(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category, subCategory } = useParams();
    const [ highestPrice, setHighestPrice] = useState(0)


    useEffect(() => {
        async function downloadProduct() {
            try {
                const collRef = collection(db, "products");
                if (subCategory) {
                    const q = query(collRef, where("category", "==", `${category}/${subCategory}`));
                    await getDocs(q).then((querySnapshot) => {
                        const products = [];
                  
                        querySnapshot.forEach((doc) => {
                            const price = doc.data().price_USD;
                            const name = doc.data().productName;
                            const img = doc.data().thumbnailImage;
                            const id = doc.id;
                            if(highestPrice<price){
                                setHighestPrice(price)
                            }
                            products.push({ id, price, name, img });
                        });
                  
                        setProducts(products);
                        setLoading(false);
                      });
                } else{
                    await getDocs(collRef).then((res)=>{
                        res.forEach((doc)=>{
                            const price = doc.data().price_USD
                            const name = doc.data().productName
                            const img = doc.data().thumbnailImage
                            const id = doc.id
                            if(highestPrice<price){
                                setHighestPrice(price)
                            }
                            setProducts([...products, {"id":id,"price":price,"name":name,"img":img}])
                        })
                        setLoading(false)
                    })
                }
            } catch (error) {
                console.error("Error downloading products:", error);
                // Consider displaying a user-friendly error message in your UI
            }
        }
        downloadProduct();
    }, []);

    
    return (
        <div className='container'>
            <div className="row">
            
                {loading ? <>Loading... </> : <Sidebar max={highestPrice}/>}
                


                {/* Produkty */}
                <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <h2 className="title text-center">Produkty</h2>
                        {loading ? (<>Loading...</>) : products.length > 0 ? (
                        products.map((product) => (
                            <Produkt key={product.id} price={product.price} name={product.name} img={product.img} id={product.id} />
                        ))
                        ) : (
                        <>Nie znaleziono żadnych produktów</>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

