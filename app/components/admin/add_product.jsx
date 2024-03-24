
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
        const { user, admin } = AppContext()
        const navigate = useNavigate();
        if(!admin) {
            navigate('/')
        }

    // Dane:
        const [productName, setProductName] = useState('');
        const [opis, setOpis] = useState('');
        const [cenaPln, setCenaPln] = useState('');
        const [cenaUsd, setCenaUsd] = useState('');
        const [cenaUah, setCenaUah] = useState('');
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
                        // Dodawanie produktu do stripe
                            const nazwa = productName;
                            const opis = opis;
                            const cena_pln = cenaPln*100; // W groszach
                            const cena_usd = cenaUsd*100; // W centach
                            const cena_uah = cenaUah*100; // W kopiejkach
                            let stripeID = ''

                            try {
                                // Tworzenie produktu
                                const product = await stripe.products.create({
                                    name: nazwa,
                                    description: opis,
                                });
                                stripeID = product.id
                            
                                // Tworzenie wariantów ceny dla różnych walut
                                const wariantPln = await stripe.prices.create({
                                    product: product.id,
                                    currency: 'pln',
                                    unit_amount: cena_pln,
                                    tax_behavior: 'inclusive',
                                });
                            
                                const wariantUsd = await stripe.prices.create({
                                    product: product.id,
                                    currency: 'usd',
                                    unit_amount: cena_usd,
                                    tax_behavior: 'inclusive',
                                });
                            
                                const wariantUah = await stripe.prices.create({
                                    product: product.id,
                                    currency: 'uah',
                                    unit_amount: cena_uah,
                                    tax_behavior: 'inclusive',
                                });
                            } catch (error) {
                                console.log(error);
                            }
                        // Dodawanie do bazy danych nowego produktu
                            await addDoc(collection(db, "products"), {
                                "productName":productName,
                                "stripeID":stripeID,
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
                        <label for="opis">Opis produktu:</label>
                        <textarea id="opis" name="opis" value={opis} onChange={(e) => setOpis(e.target.value)} required />
                        <br/><br/>
                        <label for="cena_pln">Cena (PLN): </label>
                        <input type="number" id="cena_pln" min={0} step={0.01} placeholder="00.00" name="cena_pln" value={cenaPln} onChange={(e) => setCenaPln(e.target.value)} required />
                        <br/><br/>
                        <label for="cena_usd">Cena (USD): </label>
                        <input type="number" id="cena_usd" min={0} step={0.01} placeholder="00.00" name="cena_usd" value={cenaUsd} onChange={(e) => setCenaUsd(e.target.value)} required />
                        <br/><br/>
                        <label for="cena_uah">Cena (UAH): </label>
                        <input type="number" id="cena_uah" min={0} step={0.01} placeholder="00.00" name="cena_uah" value={cenaUah} onChange={(e) => setCenaUah(e.target.value)} required />
                        <br/><br/>
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