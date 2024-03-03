import { useState } from 'react';

import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase"

import { UserAuth } from '../hooks/auth';

  

export default function Chat(){
    const { googleSignIn, logOut, user } = UserAuth();
  
    const handleGoogleSignIn = async () => {
      try {
        await googleSignIn();
      } catch (error) {
        console.log(error);
      }
    };
    const handleLogOut = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
      };
    

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
            {user ? <button onClick={()=>handleLogOut()}>Wygloguj się</button> : <button onClick={()=>handleGoogleSignIn()}>Zaloguj się</button>}
        </>
    )
}