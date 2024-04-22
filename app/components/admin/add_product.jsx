
import { useState } from "react";

import { AppContext } from "../../hooks/firebaseContext";

import { db, firebase } from "../../../firebase"
import { addDoc, collection } from "firebase/firestore";

import { useTranslation } from "react-i18next";

import { getStorage, ref, uploadBytes } from "firebase/storage";

import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';


import Error from "../../screens/error";


export default function Add_product(){
    
    // Dane:
        const [productNamePL, setProductNamePL] = useState('');
        const [productNameEN, setProductNameEN] = useState('');
        const [productNameUA, setProductNameUA] = useState('');

        const [opisPL, setOpisPL] = useState('');
        const [opisEN, setOpisEN] = useState('');
        const [opisUA, setOpisUA] = useState('');

        const [cenaUsd, setCenaUsd] = useState(0);

        const [brand, setBrand] = useState('');

        const [MainCategory, setMainCategory] = useState('');
        const [SubCategory, setSubCategory] = useState('');

        const [thumbnailImage, setThumbnailImage] = useState('');
        const [otherImages, setOtherImages] = useState([]);
        const [details, setDetails] = useState([{ titlePL:'',contentPL:'',titleEN:'',contentEN:'',titleUA:'',contentUA:'' }]);
        
        const [selectedCategory, setSelectedCategory] = useState('');
        const [subcategories, setSubcategories] = useState([]);

        const handleCategoryChange = (e) => {
            const tmp = e.target.value;
            setSelectedCategory(tmp);
            setMainCategory(tmp);

            const subcats = category[tmp];
            if (typeof subcats === 'object' && subcats !== null) {
                // To jest obiekt, więc przekształć go w tablicę
                setSubcategories(Object.values(subcats));
            } else {
                // To jest pojedyncza wartość, ustaw ją bezpośrednio
                setSubcategories([subcats]);
            }
        };
        
    // Język
        const { t } = useTranslation();
        const navigate = useNavigate();


    //Sprawdzenie, czy konto należy do admina
        const { admin, category } = AppContext()
        if(!admin) {
            return(
                <Error/>
            )
        }


        function removeFileExtension(filename) {
            const parts = filename.split('.');
            
            if (parts.length === 1) return filename;

            return parts.slice(0, -1).join('.');
          }

    
        const isJpgOrPng = (fileName) => {
            return fileName.endsWith('.jpg') || fileName.endsWith('.png');
          }

        // Dodawanie do bazy
            async function save(){
                let tmp = uuidv4();


                // Zapisywanie zdjęć
                const storage = getStorage();

                // Zapisywanie miniaturki
                    if (isJpgOrPng(thumbnailImage.name)){
                        const newThumbnailImage = tmp+removeFileExtension(thumbnailImage.name)
                        const storageRef = ref(storage, `products/${tmp}${thumbnailImage.name}`);
                        const metadata = {
                            contentType: 'image/png',
                        };
                        uploadBytes(storageRef, thumbnailImage, metadata).then((res)=>{console.log(res)})
                        
                        // Zapisanie otherImages
                            let newOtherImages = [];
                            console.log(Object.values(otherImages))
                            Object.values(otherImages).forEach((item)=>{
                                if (isJpgOrPng(item.name)){
                                    tmp = uuidv4();
                                    newOtherImages = [...newOtherImages, tmp+removeFileExtension(item.name)]
                                    const storageRef = ref(storage, `products/${tmp}${item.name}`);
                                    const metadata = {
                                        contentType: 'image/png',
                                    };
                                    uploadBytes(storageRef, item, metadata).catch((error)=>{
                                        console.log(error)
                                    })
                                }
                            })

                            let tmpCategory = MainCategory
                            if(subcategories.length>1){
                                tmpCategory = MainCategory+"/"+SubCategory
                            }

                            try {
                            // Dodawanie do bazy danych nowego produktu
                                await addDoc(collection(db, "products"), {
                                    "productNamePL":productNamePL,
                                    "productNameEN":productNameEN,
                                    "productNameUA":productNameUA,

                                    "opisPL": opisPL,
                                    "opisEN": opisEN,
                                    "opisUA": opisUA,

                                    "price_USD":cenaUsd,

                                    "brand":brand,
                                    "category":MainCategory,
                                    "thumbnailImage":newThumbnailImage,
                                    "otherImages":newOtherImages,
                                    "details":details
                                }).then((snapshot)=>{
                                    const key = snapshot.id;
                                    navigate('/product/'+key)
                                    alert(`Nowy produkt został dodany z kluczem: ${key}`);
                                }).catch((error)=>{
                                    console.log(error)
                                })

                            } catch (error) {
                                console.log(error);
                            }
                    }else{
                        console.log("Thumbnail have not valid extension")
                    }
            }



            const handleSubmit = (e) => {
                e.preventDefault();
                save()
            };

    
        const handleDetailChange = (index, key, value) => {
            const newDetails = [...details];
            newDetails[index][key] = value;
            setDetails(newDetails);
        };

    
        const addNewDetail = () => {
            setDetails([...details, { title: '', content: '' }]);
        };


    return (
        <>
            {admin && <>
                <div className="container" style={{textAlign:"center"}}>
                    <h2>Dodawanie nowego produktu:</h2>
                    <form onSubmit={handleSubmit}>

                        <h3 style={{marginTop:"80px"}}>Podaj nazwę</h3>
                        <label>Nazwa produktu (PL):<br/><input type="text" placeholder="Telewizor" value={productNamePL} onChange={(e) => setProductNamePL(e.target.value)} required/></label><br/><br/>
                        <label>Nazwa produktu (EN):<br/><input type="text" placeholder="Telewizor" value={productNameEN} onChange={(e) => setProductNameEN(e.target.value)} required/></label><br/><br/>
                        <label>Nazwa produktu (UA):<br/><input type="text" placeholder="Telewizor" value={productNameUA} onChange={(e) => setProductNameUA(e.target.value)} required/></label><br/><br/>

                        <h3 style={{marginTop:"80px"}}>Napisz opis</h3>
                        <label htmlFor="opis">Opis produktu (PL):</label>
                        <textarea id="opis" value={opisPL} onChange={(e) => setOpisPL(e.target.value)} required />
                        <label htmlFor="opis">Opis produktu (EN):</label>
                        <textarea id="opis" value={opisEN} onChange={(e) => setOpisEN(e.target.value)} required />
                        <label htmlFor="opis">Opis produktu (UA):</label>
                        <textarea id="opis" value={opisUA} onChange={(e) => setOpisUA(e.target.value)} required />

                        <br/><br/>
                        <h3 style={{marginTop:"80px"}}>Ustal cene</h3>
                        <label htmlFor="cena_usd">Cena (USD): </label>
                        <input type="number" id="cena_usd" min={0} step={0.01} placeholder="00.00" name="cena_usd" value={cenaUsd} onChange={(e) => setCenaUsd(e.target.value)} required />
                        <br/><br/>

                        <h3 style={{marginTop:"80px"}}>Napisz markę</h3>
                        <label>Marka:<br/><input type="text" value={brand} placeholder="Samsung" onChange={(e) => setBrand(e.target.value)} required/></label><br/><br/>

                        <h3 style={{marginTop:"80px"}}>Wybierz kategorie</h3>
                        <label>Kategoria: 
                        <select value={MainCategory} onChange={(e) => handleCategoryChange(e)} required>
                            <option value="" disabled defaultValue={true}>Wybierz kategorie</option>
                            {Object.keys(category).map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <br/><br/>
                        {subcategories.length > 0 && (
                            <div>
                            <label htmlFor="subcategorySelect">Wybierz podkategorię:</label>
                            <select id="subcategorySelect" onChange={(e) => setSubCategory(e.target.value)}>
                                {subcategories.map((subcat, index) => (
                                <option key={index} value={subcat}>{subcat}</option>
                                ))}
                            </select>
                            </div>
                        )}

                        </label><br/><br/>
                        <h3  style={{marginTop:"80px"}}>Wybierz zdjęcia</h3>
                        <label>Wybierz miniaturke produktu: <input type="file" onChange={(e) => setThumbnailImage(e.target.files[0])} required/></label><br/><br/>
                        <label>Wybierz reszte zdjęć produktu: <input type="file" multiple onChange={(e) => setOtherImages(e.target.files)}/></label><br/><br/>
                        {details.map((detail, index) => (
                            <div key={index} style={{marginTop:"80px"}}>
                                <h4>Detal numer: {index+1}</h4>
                                <label>Tytuł detalu (PL): <input type="text" placeholder="Rozmiar ekranu" value={detail.titlePL} onChange={(e) => handleDetailChange(index, 'titlePL', e.target.value)} required/></label>
                                <label>Zawartość detalu (PL): <textarea value={detail.contentPL} placeholder="44 cale" onChange={(e) => handleDetailChange(index, 'contentPL', e.target.value)} required/></label><br/>
                                <label>Tytuł detalu (EN): <input type="text" placeholder="Rozmiar ekranu" value={detail.titleEN} onChange={(e) => handleDetailChange(index, 'titleEN', e.target.value)} required/></label>
                                <label>Zawartość detalu (EN): <textarea value={detail.contentEN} placeholder="44 cale" onChange={(e) => handleDetailChange(index, 'contentEN', e.target.value)} required/></label><br/>
                                <label>Tytuł detalu (UA): <input type="text" placeholder="Rozmiar ekranu" value={detail.titleUA} onChange={(e) => handleDetailChange(index, 'titleUA', e.target.value)} required/></label>
                                <label>Zawartość detalu (UA): <textarea value={detail.contentUA} placeholder="44 cale" onChange={(e) => handleDetailChange(index, 'contentUA', e.target.value)} required/></label>
                            </div>
                        ))}
                        <button type="button" onClick={addNewDetail}>Dodaj detal</button><br/><br/><br/><br/><br/>
                        <button type="submit" style={{backgroundColor:"lightgreen",padding:"10px"}}>DODAJ PRODUKT</button><br/><br/>
                    </form>
                </div>
            </>}
        </>
    )
}