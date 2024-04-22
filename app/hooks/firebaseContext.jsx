

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

// Stripe
    import Stripe from 'stripe';
    import { loadStripe } from '@stripe/stripe-js';

// context
    const context = createContext();


// ContextProvider
    export function AppContextProvider({ children }){
        const navigate = useNavigate();

        // Przewalutowanie
            const [exchangeRates, setExchangeRates] = useState(null);
            useEffect(() => {
                fetch('https://api.exchangerate-api.com/v4/latest/USD')
                .then(response => response.json())
                .then(data => {
                    setExchangeRates(data.rates);
                })
                .catch(error => console.error('Error fetching exchange rates:', error));
            }, []);

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
            // Admin
                const [ admin, setAdmin ] = useState(false)
                useEffect(() => {
                    if(user){
                        if(user.uid=="CUaWiLcro3Wl3OG80Wc277tXOuE3"){
                            setAdmin(true)
                        }
                        else{
                            setAdmin(false)
                        }
                    }
                }, [user]);



        // Język
            const [ lang, setLang ] = useState(i18next.language)
            if(lang==""){setLang("pl")}
            function changeLanguage(lg) {
                if(lg=="pl"||lg=="en"||lg=="ua"){
                    i18n.changeLanguage(lg)
                    setLang(i18next.language)
                    localStorage.setItem('lang', lg)
                }
            }
        // Stripe
            const stripeKey = 'pk_test_51Op4sOLzgMVKU2AQnmq9hXQbMXHNQXUIrGxD1wLperpHp5USK9hSbzQEln2IjAPvAaH6Iq1LQUiJ4JFG67PtYsrW00bunOBqfL';

        // Kategorie
            const [ category, setCategory ] = useState(null)
            useEffect(() => {
                async function kategorie(){
                    // sessionStorage.removeItem('categories', null);
                    if(sessionStorage.getItem('categories')==null){
                        const categories = await getDocs(collection(db, "categories"));
                        const tmp = {};
                        categories.forEach((doc) => {
                            if(typeof doc.data().arrayEN==='object'){
                                tmp[doc.id] = {
                                    "textEN":doc.data().textEN,
                                    "textPL":doc.data().textPL,
                                    "textUA":doc.data().textUA,
                                    "arrayEN": {...doc.data().arrayEN},
                                    "arrayPL": {...doc.data().arrayPL},
                                    "arrayUA": {...doc.data().arrayUA}
                                }
                            }
                            else{
                                tmp[doc.id] = {
                                    "textEN":doc.data().textEN,
                                    "textPL":doc.data().textPL,
                                    "textUA":doc.data().textUA,
                                    "arrayEN": doc.data().arrayEN,
                                    "arrayPL": doc.data().arrayPL,
                                    "arrayUA": doc.data().arrayUA
                                }
                            }
                        });
                        sessionStorage.setItem('categories', JSON.stringify(tmp));
                    }
    
                }
                kategorie().then(()=>{
                    setCategory(JSON.parse(sessionStorage.getItem('categories')))
                }).catch(err=>alert(err))
            }, []);
            // async function kategorie(){
            //     if(sessionStorage.getItem('categories')==null){
            //         const categories = await getDocs(collection(db, "categories"));
            //         const tmp = {};
            //         categories.forEach((doc) => {
            //             if(typeof doc.data().array==='object'){
            //                 tmp[doc.data().text] = {...doc.data().array};
            //             }
            //             else{
            //                 tmp[doc.data().text] = doc.data().array;
            //             }
            //         });
            //         sessionStorage.setItem('categories', JSON.stringify(tmp));
            //     }

            // }
            // kategorie().then(()=>{
            //     setCategory(JSON.parse(sessionStorage.getItem('categories')))
            // }).catch(err=>alert(err))
            

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
            <context.Provider value={{ handleLogOut, user, cart, handleGoogleSignIn, handleEmailSignIn, changeLanguage, lang, admin, category, stripeKey, exchangeRates }}>
                {children}
            </context.Provider>
        );
    }

// UseContext
    export function AppContext(){
        return useContext(context);
    }