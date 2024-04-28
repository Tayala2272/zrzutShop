

// Api for create sessions
const functions = require('firebase-functions');
const express = require('express');

const app = express();

const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();


app.use(express.json());
const cors = require('cors');
app.use(cors({ origin: true }));


app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Stripe keys
const stripe = require('stripe')('sk_test_51Op4sOLzgMVKU2AQ3QXLVwBwYePzavHP09NeN3acNlnU0v0hJgKQAmsg5bFHcpxu2gy9VuEaBmMgvTQmTSh461xW00jTrnyyQx');
const endpointSecret = 'whsec_Z5oVtwpPCKHAllnKNgAcLHKBRr6rsLnq'


























const axios = require('axios');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const { getFirestore } = require('firebase-admin/firestore');

// Inicjalizacja Firebase Admin
const serviceAccount = require('./apikey.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'https://zrzutshop-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = getFirestore();
const storage = getStorage();
const bucket = storage.bucket();




app.post('/create-products', async (req, res) => {

  const body = req.body;
  const { en } = req.body;
    
  try {
      // Dodawanie produktu do Firestore
      const productRef = await db.collection('products').add({
          productNameEN: body.en.name,
          productNamePL: body.pl.name,
          productNameUA: body.ua.name,
          price_USD: body.en.price,
          category: body.en.categoryId,
          imageUrl: []
      });

      // Pobieranie i zapisywanie obrazów
      const imageUrls = await Promise.all(en.images.map(async (imgUrl) => {
          const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'utf-8');
          const filename = `products/${productRef.id}/${imgUrl.split('/').pop()}`;
          const file = storage.bucket('zrzutshop.appspot.com').file(filename);
          await file.save(buffer, {
              metadata: { contentType: 'image/jpeg' },
              public: true,
              validation: 'md5'
          });
          return file.publicUrl();
      }));

      // Aktualizacja produktu z URL obrazów
      await productRef.update({ imageUrl: imageUrls });

      res.send({ success: true, productID: productRef.id, images: imageUrls });
  } catch (error) {
      console.error("Error adding product: ", error);
      res.status(500).send("Error adding product");
  }
});






app.post('/create-checkout-session/:methods/:id', async (req, response) => {
const methods = [req.params.methods]
const customSessionId = req.params.id
const products = req.body
const currency = products[0].price_data.currency
let shipping = [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: {
        amount: 0,
        currency: 'pln',
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
        currency: 'pln',
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
]
if(currency=="pln"){
  shipping[0].shipping_rate_data.fixed_amount.amount = 0
  shipping[0].shipping_rate_data.fixed_amount.currency = currency
  shipping[1].shipping_rate_data.fixed_amount.amount = 1500
  shipping[1].shipping_rate_data.fixed_amount.currency = currency
}
if(currency=="usd"){
  shipping[0].shipping_rate_data.fixed_amount.amount = 0
  shipping[0].shipping_rate_data.fixed_amount.currency = currency
  shipping[1].shipping_rate_data.fixed_amount.amount = 500
  shipping[1].shipping_rate_data.fixed_amount.currency = currency
}
if(currency=="uah"){
  shipping[0].shipping_rate_data.fixed_amount.amount = 0
  shipping[0].shipping_rate_data.fixed_amount.currency = currency
  shipping[1].shipping_rate_data.fixed_amount.amount = 5000
  shipping[1].shipping_rate_data.fixed_amount.currency = currency
}
// card, acss_debit, affirm, afterpay_clearpay, alipay, au_becs_debit, bacs_debit, bancontact, blik, boleto, cashapp, customer_balance, eps, fpx, giropay, grabpay, ideal, klarna, konbini, link, oxxo, p24, paynow, paypal, pix, promptpay, sepa_debit, sofort, swish, us_bank_account, wechat_pay, revolut_pay, zip'
const session = await stripe.checkout.sessions.create({
  payment_method_types: methods,
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
  shipping_options: shipping,
  line_items:products,
  mode: 'payment',
  success_url: `https://zozuladrop.pl/cart?success=true`,
  cancel_url: `https://zozuladrop.pl/cart?canceled=true`,
  metadata: { customSessionId: customSessionId }, // Id sesji
  payment_intent_data: {
    metadata: {
      customSessionId: customSessionId
    }
  }
});
response.send(JSON.stringify(session.url));
});


const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

exports.api = functions.https.onRequest(app);




// Stripe API

  exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];

    console.log('start')
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      console.error(err)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    const session = event.data.object;
    const customSessionId = session.metadata.customSessionId;
    console.log('sessionID',customSessionId)


    let checkoutStatus = 'none';
    let paymentStatus = 'none';

    // Handle the event
    switch (event.type) {
      // Checkout
      case 'checkout.session.async_payment_failed':
        checkoutStatus = 'checkout_failed'
        break;
      case 'checkout.session.async_payment_succeeded':
        checkoutStatus = 'checkout_succeeded'
        break;
      case 'checkout.session.completed':
        checkoutStatus = 'checkout_completed'
        break;
      case 'checkout.session.expired':
        checkoutStatus = 'checkout_expired'
        break;
      // Płatność
      case 'payment_intent.canceled':
        paymentStatus = 'payment_canceled'
        break;
      case 'payment_intent.payment_failed':
        paymentStatus = 'payment_failed'
        break;
      case 'payment_intent.processing':
        paymentStatus = 'payment_processing'
        break;
      case 'payment_intent.requires_action':
        paymentStatus = 'payment_requiresAction'
        break;
      case 'payment_intent.succeeded':
        paymentStatus = 'payment_succeeded'
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    console.log('payStatus',paymentStatus)


    try {
      if(checkoutStatus!='none'){
        await firestore.collection('orders').doc(customSessionId).update({
          checkoutStatus: checkoutStatus
        });
      }else if(paymentStatus!='none'){
        await firestore.collection('orders').doc(customSessionId).update({
          paymentStatus: paymentStatus
        });
      }
    } catch (error) {
        console.error(`Error updating document: ${error}`);
        res.status(400).send(`Error updating document`);
        return;
    } finally {
    }
    console.log("ID===================",customSessionId)
    // Return a 200 response to acknowledge receipt of the event
    res.send();
  });
