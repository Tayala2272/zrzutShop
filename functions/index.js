

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
const serviceAccount = require('./firebase.json');

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

  var categoryId = body.en.categoryId;
  let category = ""

  // Teraz wykonujemy serię sprawdzeń if dla każdego id kategorii
  if (categoryId === "30014688" || categoryId === "108442227") {
      // console.log("Beauty and health");
      category = "H8RFGylrg4iukAPlMvlS"
  } else if (categoryId === "30017035") {
      // console.log("Automotive products, power tools, hand tools");
      category = "eCgUGhkQH586GcHJM46D"
  } else if (categoryId === "30017047" || categoryId === "86247595" || categoryId === "98559707") {
      // console.log("Sports, health, tourism");
      category = "0N5p8YZ62QrckNkoLiDb"
  } else if (categoryId === "30018536" || categoryId === "86247596" || categoryId === "88376566") {
      // console.log("Electronics");
      category = "kiJQikatxOOOhbOiW67j"
  } else if (categoryId === "30017053") {
      // console.log("Home and Garden Products");
      category = "vE3hKYGhvOlWDjjjYAxH"
  } else if (categoryId === "30017064") {
      // console.log("Children's world, children's products");
      category = "ykH2dyka58qnMUDhI690"
  } else if (categoryId === "82325193") {
      // console.log("Bean bag chairs, pear chairs");
      category = "oQpecFpZk3R4X25VxhAx"
  } else if (categoryId === "70180736") {
      // console.log("Speakers and acoustic systems");
      category = "ykbKK6zzSISDjWPuqEqQ"
  } else if (categoryId === "70173138") {
      // console.log("Pet Products");
      category = "q5dAwuxWXeFM6rY6mEaX"
  } else if (categoryId === "70180949") {
      // console.log("PowerBank, external batteries");
      category = "nI03jamgHWOSladrwLgg"
  } else if (categoryId === "70181491") {
      // console.log("Lanterns, spotlights, lamps");
      category = "NbeJ7Jdi2ZAc1EBh260x"
  } else if (categoryId === "70182026") {
      // console.log("Headphones and headset");
      category = "4QzuNjw7i4w4U8VZp6fh"
  } else if (categoryId === "71610854") {
      // console.log("Water coolers");
      category = "EJtEuQw5UIVkQeWdkcLl"
  } else if (categoryId === "30018858" || categoryId === "92670183") {
      // console.log("Everything for the kitchen");
      category = "xwdpdXACUXsGKTkQcz2H"
  } else if (categoryId === "64032704") {
      // console.log("Suitcases / Bags");
      category = "ZdPHrwjIwGWcKylcplyp"
  } else if (categoryId === "99320587" || categoryId === "108852295") {
      // console.log("Gifts and souvenirs");
      category = "bh8w21N8vs0lpkxT10TI"
  } else if (categoryId === "99406043") {
      // console.log("Clothes and shoes");
      category = "5svGJmWNirSQPnTp9Ka7"
  } else if (categoryId === "109460283") {
      // console.log("Perfumes. Women's and Men's perfumes");
      category = "eMYTPEJmGHzBcP8Ws4eT"
  } else if (categoryId === "101985757") {
      // console.log("New Year's goods");
      category = "7Jm9hs7CJ5uRDMfPCqrp"
  } else if (categoryId === "108784467") {
      // console.log("Bed linen, towels");
      category = "zdzI44saOVP44UgSTz3N"
  } else if (categoryId === "108482107") {
      res.send("lol")
      return ""
  } else if (categoryId === "108495070") {
      // console.log("Victoria's Secret Fragrance Sprays");
      category = "2PrMYHkonIV1N9sxJXep"
  } else if (categoryId === "110446915") {
      // console.log("BILOU cosmetics, all products of the acclaimed German brand, ORIGINAL!");
      category = "Iu6hL1zwWepwNJXg3mLl"
  } else if (categoryId === "109015942") {
      // console.log("Pajamas, underwear, robes");
      category = "GbXKWzQZ9L952gwHAX01"
  } else if (categoryId === "108117197") {
      // console.log("Men's shoes");
      category = "RBFU2Yu8L0CrHFnpuT6P"
  } else if (categoryId === "108118382") {
      // console.log("Women's shoes");
      category = "v9rbTSxonsgVAxTDZoN7"
  } else {
    res.send("lol")
    return ""
  }
    
  try {
      // Dodawanie produktu do Firestore
      const productRef = await db.collection('products').add({
          productNameEN: body.en.name,
          productNamePL: body.pl.name,
          productNameUA: body.ua.name,

          opisEN:body.en.description,
          opisPL:body.pl.description,
          opisUA:body.ua.description,

          price_USD: (body.en.price/39.70).toFixed(2),

          brand:"",

          category: category+"/"+category,

          otherImages: [],
          thumbnailImage:"",
          
          detail: []
      });

      // Pobieranie i zapisywanie obrazów
      let zdjecia = []
      const imageUrls = await Promise.all(en.images.map(async (imgUrl) => {
          const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'utf-8');
          const filename = `products/${productRef.id}/${imgUrl.split('/').pop()}`;
          const variable = imgUrl.split('/').pop()
          let tmp = variable.split('.')
          tmp.pop()
          console.log("=======================================",tmp)
          zdjecia.push(tmp[0])
          const file = storage.bucket('zrzutshop.appspot.com').file(filename);
          await file.save(buffer, {
              metadata: { contentType: 'image/jpeg' },
              public: true,
              validation: 'md5'
          });
          return file.publicUrl();
      }));

      // Aktualizacja produktu z URL obrazów
      let firstElement = zdjecia[0]
      zdjecia.shift()
      await productRef.update({ otherImages: zdjecia, thumbnailImage: firstElement });

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
const { arrayRemove } = require('firebase/firestore');

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
