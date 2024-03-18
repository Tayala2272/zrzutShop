
import { useState } from "react";

import { AppContext } from "../../hooks/firebaseContext";
import { useNavigate } from "react-router-dom";

import { db, firebase } from "../../../firebase"
import { addDoc, collection } from "firebase/firestore";

import { useTranslation } from "react-i18next";

import { getStorage, ref, uploadBytes } from "firebase/storage";

import { v4 as uuidv4 } from 'uuid';





export default function Add_product(){
    //Sprawdzenie, czy konto należy do admina
        let admin = false
        const { user } = AppContext()
        if(user){
            if(user.uid=="CUaWiLcro3Wl3OG80Wc277tXOuE3"){
                admin = true
            }
        }
        const navigate = useNavigate();
        if(!admin) {
            navigate('/')
        }

    // Dane:
        const [productName, setProductName] = useState('');
        const [price, setPrice] = useState('');
        const [brand, setBrand] = useState('');
        const [category, setCategory] = useState('');
        const [thumbnailImage, setThumbnailImage] = useState('');
        const [otherImages, setOtherImages] = useState([]);
        const [details, setDetails] = useState([{ title: '', content: '' }]);
    
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
                        const newThumbnailImage = tmp+thumbnailImage.name
                        const storageRef = ref(storage, `products/${tmp}${thumbnailImage.name}`);
                        const metadata = {
                            contentType: 'image',
                        };
                        uploadBytes(storageRef, thumbnailImage, metadata).then((res)=>{console.log(res)})
                        
                        // Zapisanie otherImages
                            let newOtherImages = [];
                            console.log(Object.values(otherImages))
                            Object.values(otherImages).forEach((item)=>{
                                if (isJpgOrPng(item.name)){
                                    tmp = uuidv4();
                                    newOtherImages = [...newOtherImages, tmp+item.name]
                                    const storageRef = ref(storage, `products/${tmp}${item.name}`);
                                    const metadata = {
                                        contentType: 'image',
                                    };
                                    uploadBytes(storageRef, item, metadata).catch((error)=>{
                                        console.log(error)
                                    })
                                }
                            })
                        // Dodawanie do bazy danych nowego produktu
                            await addDoc(collection(db, "products"), {
                                "productName":productName,
                                "price":price,
                                "brand":brand,
                                "category":category,
                                "thumbnailImage":newThumbnailImage,
                                "otherImages":newOtherImages,
                                "details":details
                            }).then((snapshot)=>{
                                const key = snapshot.id;
                                navigate('/product/'+key)
                                console.log(`Nowy produkt został dodany z kluczem: ${key}`);
                            }).catch((error)=>{
                                console.log(error)
                            })
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


        const { t } = useTranslation();
    return (
        <>
            {admin && <>
                <div className="container" style={{textAlign:"center"}}>
                    <h2>Dodawanie nowego produktu:</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Nazwa produktu:{t('test')}<br/><input type="text" placeholder="Telewizor" value={productName} onChange={(e) => setProductName(e.target.value)} required/></label><br/><br/>
                        <label>Cena: (w zł)<br/><input type="number" min="0" max="999999" placeholder="00.00" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required/></label><br/><br/>
                        <label>Marka:<br/><input type="text" value={brand} placeholder="Samsung" onChange={(e) => setBrand(e.target.value)} required/></label><br/><br/>
                        <label>Kategoria: 
                        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="" disabled selected>Wybierz kategorie</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Books">Books</option>
                        </select>
                        </label><br/><br/>
                        <label>Wybierz miniaturke produktu: <input type="file" onChange={(e) => setThumbnailImage(e.target.files[0])} required/></label><br/><br/>
                        <label>Wybierz reszte zdjęć produktu: <input type="file" multiple onChange={(e) => setOtherImages(e.target.files)}/></label><br/><br/>
                        {details.map((detail, index) => (
                            <div key={index}>
                                <label>Tytuł detalu: <input type="text" placeholder="Rozmiar ekranu" value={detail.title} onChange={(e) => handleDetailChange(index, 'title', e.target.value)} required/></label>
                                <label>Zawartość detalu: <textarea value={detail.content} placeholder="44 cale" onChange={(e) => handleDetailChange(index, 'content', e.target.value)} required/></label>
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