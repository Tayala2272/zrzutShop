import { useState } from 'react';

import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase"

import {UserAuth} from "../hooks/auth"
  

export default function Chat(){
    const {handleGoogleSignIn, handleLogOut, user} = UserAuth()

    function Wczytaj(){
        return (
            <button onClick={()=>{
                onSnapshot(doc(db, "test", "SF"), (doc) => {
                    console.log("Current data: ", doc.data());
                    setValue(doc.data().pole)
                });
            }}>Wczytaj dane</button>
        )
    }
    const [value, setValue] = useState("")

    console.log(user)
    
    return(
        <>
            {value ? value : <Wczytaj/>}
            {user ? <button onClick={()=>handleLogOut()}>Wygloguj się</button> : <button onClick={()=>handleGoogleSignIn()}>Zaloguj się z google</button>}
        </>
    )
}