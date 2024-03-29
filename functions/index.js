


// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Op4sOLzgMVKU2AQ3QXLVwBwYePzavHP09NeN3acNlnU0v0hJgKQAmsg5bFHcpxu2gy9VuEaBmMgvTQmTSh461xW00jTrnyyQx');
const express = require('express');

const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session/:uid', async (req, res) => {
  const uid = req.params.uid
  if(uid != 'CUaWiLcro3Wl3OG80Wc277tXOuE3'){
    req.send('Brak uprawnień')
    return
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types:[
        'card',
        // card, acss_debit, affirm, afterpay_clearpay, alipay, au_becs_debit, bacs_debit, bancontact, blik, boleto, cashapp, customer_balance, eps, fpx, giropay, grabpay, ideal, klarna, konbini, link, oxxo, p24, paynow, paypal, pix, promptpay, sepa_debit, sofort, swish, us_bank_account, wechat_pay, revolut_pay, zip'
    ],
    shipping_address_collection: {
      allowed_countries: ['PL', 'UA'],
    },
    // consent_collection: {
    //   terms_of_service: 'required',
    // },
    automatic_tax: {
      enabled: true,
    },
    phone_number_collection: {
      enabled: true,
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'uah',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'uah',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1OxYukLzgMVKU2AQvb7N4ZHW',
        quantity: 1,
      },
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1OxYukLzgMVKU2AQvb7N4ZHW',
        quantity: 3,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});




app.post('/create-product/:uid', async (req, res) => {
    const uid = req.params.uid
    if(uid != 'CUaWiLcro3Wl3OG80Wc277tXOuE3'){
      req.send('Brak uprawnień')
      return
    }

    const nazwa = "Testowy telewizor";
    const opis = "Opis produktu";
    const cena_pln = 1000; // W groszach
    const cena_usd = 1500; // W centach
    const cena_uah = 3000; // W kopiejkach

    try {
        // Tworzenie produktu
        const product = await stripe.products.create({
            name: nazwa,
            description: opis,
        });
    
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
    
        res.send(`ID produktu: ${product.id}`);
    } catch (error) {
        res.send(error);
    }
})

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.app = onRequest(app);