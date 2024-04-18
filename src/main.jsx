import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter,  Route, Routes } from 'react-router-dom';

// Language
  import "../app/lang/language.js"

// Elements
  import Navbar from '../app/components/navbar';
  import Footer from '../app/components/footer';

// strony
  import Index from '../app/screens'
  import Login from '../app/screens/login'
  import Error from '../app/screens/error';
  import Contact from '../app/screens/contact';
  import Cart from '../app/screens/cart';
  import Chat from '../app/screens/chat';
  import Product_detail from '../app/screens/product_detail';
  import Add_product from '../app/components/admin/add_product';
  import Shop from '../app/screens/shop';
  import About from '../app/screens/about';
  import Account from '../app/screens/account.jsx';
  import Orders from '../app/screens/orders.jsx';
  import Order from '../app/screens/order.jsx';

// JS
  import $ from 'jquery';
  window.jQuery = $;
  window.$ = $;
  import '../app/assets/js/jquery.js';
  import '../app/assets/js/bootstrap.min.js';
  import '../app/assets/js/jquery.scrollUp.min.js';
  import '../app/assets/js/price-range.js';
  import '../app/assets/js/main.js';

// CSS
  import '../app/assets/css/bootstrap.min.css';
  import '../app/assets/css/prettyPhoto.css';
  import '../app/assets/css/price-range.css';
  import '../app/assets/css/animate.css';
  import '../app/assets/css/main.css';
  import '../app/assets/css/responsive.css';


// Firebase
  import { AppContextProvider } from '../app/hooks/firebaseContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/shop/:category/:subCategory" element={<Shop />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/order/:id" element={<Order />} />


          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Product_detail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/add-product" element={<Add_product />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
