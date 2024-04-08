

import React, { useCallback, useState, useEffect } from "react";

import { AppContext } from "../hooks/firebaseContext";

import { loadStripe } from '@stripe/stripe-js';

export default async function Place_an_order(payment) {

    // Sprawdzenie, czy użytkownik jest zalogowany
        const { cart, user, exchangeRates, stripe } = AppContext()
        if(!user){
            return "Musisz się zalogować, aby złożyć zamówienie"
        }

    // Sprawdzenie, czy klient posiada jakiekolwiek produkty w koszyku
        if(cart.length<=0){
            return "Brak produktów w koszyku"
        }

    // Create checkout
        const stripePromise = loadStripe(stripe);
        setIsCheckoutLoading(true);
        try {
            const stripe = await stripe;
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    customPrice,
                }),
            });
            const session = await response.json();
            await stripe.redirectToCheckout({
                sessionId: session.id,
            });
        } catch (error) {
            return 'Wystąpił błąd podczas tworzenia sesji płatności.'
        } finally {
            setIsCheckoutLoading(false);
        }
        

}