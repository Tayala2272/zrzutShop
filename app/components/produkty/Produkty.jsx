
import { useState, useEffect } from "react";

import { useParams, useLocation } from 'react-router-dom'

import Sidebar from "../sidebar/sidebar"
import Produkt from "./Produkt"

import { collection, query, getDocs, where, limit, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

import { AppContext } from "../../hooks/firebaseContext";
import { v1 as uuidv1 } from 'uuid';


export default function Produkty(){
    const { lang, exchangeRates } = AppContext()

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category, subCategory } = useParams();
    const location = useLocation();
    const [ highestPrice, setHighestPrice] = useState(0)

    const [ maxProducts, setMax ] = useState(20)


    useEffect(() => {
        async function downloadProduct() {
            setLoading(true)
            try {
                setProducts([])
                const collRef = collection(db, "products")

                let q = ""
                if (subCategory){
                    q = query(collRef, limit(maxProducts), where("category", "==", `${category}/${subCategory}`))
                } 
                else if(category){
                    q = query(collRef, limit(maxProducts), where("category", "==", `${category}/${category}`))
                }
                else{
                    q = query(collRef, limit(maxProducts))
                }

                await getDocs(q).then((res)=>{
                    let tmp = [];
                    let max = [];
                    if(res.docs){
                        if(res.docs.length>0){
                            res.forEach((doc) => {
                                if(tmp.length<maxProducts){
                                    const prod = doc.data()
                                    max.push(prod.price_USD)
                                    tmp.push({"id":doc.id,"price":prod.price_USD,"nameEN":prod.productNameEN,"namePL":prod.productNamePL,"nameUA":prod.productNameUA,"img":prod.thumbnailImage,"display":true})
                                }
                            });
                        }
                    }
                    setHighestPrice(Math.max(...max))
                    setProducts(tmp)
                    setLoading(false)
                })
            } catch (error) {
                console.error("Error downloading products:", error);
                // Consider displaying a user-friendly error message in your UI
            }
        }
        downloadProduct();
    }, [category,subCategory,location]);




    
    return (
        <div className='container'>
            <div className="row">
            
                <Sidebar max={loading ? 0 : highestPrice} lang={lang} exchangeRates={exchangeRates} />
                


                {/* Produkty */}
                <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <h2 className="title text-center">Produkty</h2>
                        {loading ? (<>Loading...</>) : products.length > 0 ? (
                            products.map((product) => {
                                if(product.display){
                                    return <Produkt key={product.id+uuidv1()} price={product.price} nameEN={product.nameEN} namePL={product.namePL} nameUA={product.nameUA} img={product.img} id={product.id} lang={lang} exchangeRate={exchangeRates} />
                                }
                            })
                            ) : (
                            <>Nie znaleziono żadnych produktów</>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

