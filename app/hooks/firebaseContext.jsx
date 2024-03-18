

// React
    import React, { createContext, useContext, useState, useEffect } from 'react'

// Navigate
    import { useNavigate } from "react-router-dom";

// Auth
    import { GoogleAuthProvider, signInWithRedirect,  signOut, onAuthStateChanged } from 'firebase/auth';
    import { auth } from '../../firebase';


// Firestore
    import { collection, addDoc, query, where, getDocs, setDoc, onSnapshot } from "firebase/firestore";
    import { db } from '../../firebase';

// context
    const context = createContext();


// ContextProvider
    export function AppContextProvider({ children }){
        const navigate = useNavigate();

        // Auth
            const [user, setUser] = useState({});

            // Google sign in
                const googleSignIn = () => {
                const provider = new GoogleAuthProvider();
                // signInWithPopup(auth, provider);
                signInWithRedirect(auth, provider)
                };
                const handleGoogleSignIn = async () => {
                    try {
                        await googleSignIn();
                    } catch (error) {
                        console.log(error);
                    }
                };

            // LogOut
                const logOut = () => {
                    signOut(auth)
                }
                const handleLogOut = async () => {
                try {
                    await logOut();
                    navigate('/')
                } catch (error) {
                    console.log(error);
                }
                };

            // Logowanie
                useEffect(() => {
                    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                        setUser(currentUser);
                    });
                    return () => {
                        unsubscribe();
                    };
                }, []);


        // Koszyk
            const [ cart, setCart ] = useState([])
            useEffect(() => {
                if(typeof user!=='undefined' && user){
                    if ('uid' in user) {
                        const q = query(collection(db, "cart"), where("uid", "==", user.uid));

                        const unsubscribe = onSnapshot(q, (snapshot) => {
                            const products = [];
                            snapshot.forEach((doc) => {
                                products.push(doc.data());
                            });
                            setCart(products)
                        });
                        return () => {
                            unsubscribe();
                        };
                    }
                }
            }, [user]);
            


        return (
            <context.Provider value={{ handleLogOut, user, cart, handleGoogleSignIn }}>
                {children}
            </context.Provider>
        );
    }

// UseContext
    export function AppContext(){
        return useContext(context);
    }