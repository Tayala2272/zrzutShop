
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

    const [maxProducts,setMax] = useState(20)


    useEffect(() => {
        async function downloadProduct() {
            // try {
            //     const productsRef = collection(db, 'products');
            //     const q = query(productsRef, limit(5), where('category','==','xwdpdXACUXsGKTkQcz2H/xwdpdXACUXsGKTkQcz2H'));
            //     await getDocs(q).then((res)=>{
            //         setLoading(false)
            //         res.forEach((doc) => {
            //             console.log(doc.id, " => ", doc.data());
            //             // const productsData = res.docs.map(doc => ({
            //             //   id: doc.id,
            //             //   ...doc.data()
            //             // }))
            //             tmp.push(doc.id)
            //         });
            //     }).then(()=>{
            //         console.log(tmp)
            //         // setProducts(tmp);
            //     });

            //   } catch (error) {
            //     console.error("Error fetching products: ", error);
            //   }
            try {
                setProducts([])
                console.log('new')
                const collRef = collection(db, "products");
                if (subCategory) {
                    await getDocs(query(collRef, limit(maxProducts), where("category", "==", `${category}/${subCategory}`))).then((res) => {
                        let tmp = [];
                        if(res.docs){
                            if(res.docs.length>0){

                                res.forEach((doc) => {
                                    if(tmp.length<maxProducts){
                                        const prod = doc.data()
                                        // if(highestPrice<price){
                                        //     setHighestPrice(price)
                                        // }
                                        tmp.push({"id":doc.id,"price":prod.price_USD,"nameEN":prod.productNameEN,"namePL":prod.productNamePL,"nameUA":prod.productNameUA,"img":prod.thumbnailImage})
                                    }
                                });
                                setProducts(tmp);
                            }
                        }
                        setLoading(false);
                      });
                } else if(category){
                    await getDocs(query(collRef, limit(maxProducts), where("category", "==", `${category}/${category}`))).then((res)=>{
                        let tmp = [];
                        if(res.docs){
                            if(res.docs.length>0){

                                res.forEach((doc) => {
                                    if(tmp.length<maxProducts){
                                        const prod = doc.data()
                                        // if(highestPrice<price){
                                        //     setHighestPrice(price)
                                        // }
                                        tmp.push({"id":doc.id,"price":prod.price_USD,"nameEN":prod.productNameEN,"namePL":prod.productNamePL,"nameUA":prod.productNameUA,"img":prod.thumbnailImage})
                                    }
                                });
                                setProducts(tmp);
                            }
                        }
                        setLoading(false);
                    })
                }else{
                    console.log('all')
                    setLoading(false)
                    // await getDocs(query(collRef,limit(maxProducts))).then((res)=>{
                    //     let tmp = [];
                    //     res.forEach((doc)=>{
                    //         if(tmp.length<maxProducts){
                    //             const prod = doc.data()
                    //             // if(highestPrice<price){
                    //             //     setHighestPrice(price)
                    //             // }
                    //             tmp.push({"id":doc.id,"price":prod.price_USD,"nameEN":prod.productNameEN,"namePL":prod.productNamePL,"nameUA":prod.productNameUA,"img":prod.thumbnailImage})
                    //         }
                    //     })
                    //     setProducts(tmp)
                    //     setLoading(false)
                    // })
                }
            } catch (error) {
                console.error("Error downloading products:", error);
                // Consider displaying a user-friendly error message in your UI
            }
        }
        setLoading(true)
        downloadProduct();
    }, [category,subCategory,location]);

    
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
                            <Produkt key={product.id+uuidv1()} price={product.price} nameEN={product.nameEN} namePL={product.namePL} nameUA={product.nameUA} img={product.img} id={product.id} lang={lang} exchangeRate={exchangeRates} />
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

