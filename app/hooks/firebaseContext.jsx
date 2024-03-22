

// React
    import React, { createContext, useContext, useState, useEffect } from 'react'

// Navigate
    import { useNavigate } from "react-router-dom";

// Auth
    import { GoogleAuthProvider, signInWithRedirect,  signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '../../firebase';


// Firestore
    import { collection, addDoc, query, where, getDocs, setDoc, onSnapshot } from "firebase/firestore";
    import { db } from '../../firebase';

// Language
    import i18n from "i18next";
    import i18next from 'i18next';

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
                        googleSignIn();
                    } catch (error) {
                        console.log(error);
                    }
                };

            // Sign in with email and password
                async function handleEmailSignIn (email, password){
                    await signInWithEmailAndPassword(auth, email, password)
                        .then(() => {
                            alert("Zalogowano")
                        })
                        .catch((err) => {
                            alert(err)
                        })
                }
                

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



        // Język
            const [ lang, setLang ] = useState(i18next.language)
            function changeLanguage(lg) {
                if(lg=="pl"||lg=="en"||lg=="ua"){
                    i18n.changeLanguage(lg)
                    setLang(i18next.language)
                    localStorage.setItem('lang', lg)
                }
            }

            

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
            <context.Provider value={{ handleLogOut, user, cart, handleGoogleSignIn, handleEmailSignIn, changeLanguage, lang }}>
                {children}
            </context.Provider>
        );
    }

// UseContext
    export function AppContext(){
        return useContext(context);
    }