
import { useState, useEffect } from "react";

import { useParams, useLocation } from 'react-router-dom'

import Sidebar from "../sidebar/sidebar"
import Produkt from "./Produkt"

import { collection, query, getDocs, where, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";

import { AppContext } from "../../hooks/firebaseContext";


export default function Produkty(){
    const { lang, exchangeRates } = AppContext()

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category, subCategory } = useParams();
    const [ highestPrice, setHighestPrice] = useState(0)


    useEffect(() => {
        async function downloadProduct() {
            try {
                setProducts([])
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
                } else if(category){
                    const q = query(collRef, where("category", "==", `${category}/${category}`));
                    await getDocs(q).then((res)=>{
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
                }else{
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
    }, [category,subCategory]);

    
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
                            <Produkt key={product.id} price={product.price} name={product.name} img={product.img} id={product.id} lang={lang} exchangeRate={exchangeRates} />
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

