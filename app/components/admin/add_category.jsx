

import { useState } from "react";


import { AppContext } from "../../hooks/firebaseContext";
import Error from "../../screens/error";


import { db } from "../../../firebase"
import { addDoc, collection } from "firebase/firestore";


export default function Add_category(){
    const [kategoria, setKategoria] = useState({
        arrayEN: [],
        arrayPL: [],
        arrayUA: [],
        textEN: '',
        textPL: '',
        textUA: ''
    });

    const { admin, category } = AppContext()
    if(!admin) {
        return(
            <Error/>
        )
    }

    function addSubcategory(){
        const tmp = []
        for (let i = 0; i < kategoria.arrayEN.length + 1; i++) {
            tmp.push('')
        }
        setKategoria({
            arrayEN: tmp,
            arrayPL: tmp,
            arrayUA: tmp,
            textEN: kategoria.textEN,
            textPL: kategoria.textPL,
            textUA: kategoria.textUA
        })
    }
    

    function removeSubcategory(){
        const tmp = []
        for (let i = 0; i < kategoria.arrayEN.length-1; i++) {
            tmp.push('')
        }
        setKategoria({
            arrayEN: tmp,
            arrayPL: tmp,
            arrayUA: tmp,
            textEN: kategoria.textEN,
            textPL: kategoria.textPL,
            textUA: kategoria.textUA
        })
    }
    
    const handleInputChange = (e, index, lang) => {
        if(lang=="EN"){
            const newArrayEN = [...kategoria.arrayEN];
            newArrayEN[index] = e.target.value;
            setKategoria({ ...kategoria, arrayEN: newArrayEN });
        }
        if(lang=="PL"){
            const newArrayPL = [...kategoria.arrayPL];
            newArrayPL[index] = e.target.value;
            setKategoria({ ...kategoria, arrayPL: newArrayPL });
        }
        if(lang=="UA"){
            const newArrayUA = [...kategoria.arrayUA];
            newArrayUA[index] = e.target.value;
            setKategoria({ ...kategoria, arrayUA: newArrayUA });
        }
      };
    
    const handleSubmit = async () => {
        var tmp = kategoria
        if(tmp.arrayEN.length==0){
            tmp.arrayEN = tmp.textEN
            tmp.arrayPL = tmp.textPL
            tmp.arrayUA = tmp.textUA
        }
        await addDoc(collection(db, "categories"), tmp).then(()=>{
            alert("Dodano nową kategorię")
        })
    };
    
    return (
        <div className="container" style={{textAlign:"center",marginBottom:"100px",marginTop:"100px"}}>
            <h4>Nazwa kategorii:</h4>
            <label>Nazwa kategorii (EN): <input type="text" value={kategoria.textEN} onChange={(e) => setKategoria({...kategoria, textEN:e.target.value})}/></label><br />
            <label>Nazwa kategorii (PL): <input type="text" value={kategoria.textPL} onChange={(e) => setKategoria({...kategoria, textPL:e.target.value})}/></label><br />
            <label>Nazwa kategorii (UA): <input type="text" value={kategoria.textUA} onChange={(e) => setKategoria({...kategoria, textUA:e.target.value})}/></label><br/><br/><br/><br/>
            <button onClick={()=>addSubcategory()}>Dodaj podkategorię</button>
            <button onClick={()=>removeSubcategory()}>Usuń podkategorię</button>
            <p>Liczba podkategorii: {kategoria.arrayEN.length}</p>
            {kategoria.arrayEN.map((index, value)=>{
                return(
                    <div key={value} style={{marginTop:"80px"}}>
                        <h4>Podkategoria numer {value+1}</h4>
                        <label>Nazwa podkategorii (EN): <input type="text" value={kategoria.arrayEN[value]} onChange={(e) => handleInputChange(e, value, "EN")}/></label><br />
                        <label>Nazwa podkategorii (PL): <input type="text" value={kategoria.arrayPL[value]} onChange={(e) => handleInputChange(e, value, "PL")}/></label><br />
                        <label>Nazwa podkategorii (UA): <input type="text" value={kategoria.arrayUA[value]} onChange={(e) => handleInputChange(e, value, "UA")}/></label><br />
                    </div>
                )
            })}
            <br/><br/><br/><button onClick={()=>handleSubmit()} style={{backgroundColor:"lightgreen",padding:"10px"}}>Dodaj kategorie</button>
        </div>
      );
}