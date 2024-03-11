import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter,  Route, Routes } from 'react-router-dom';

// Auth
  import { AuthContextProvider } from '../app/hooks/auth';

  import "../app/hooks/language"

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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Product_detail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/add-product" element={<Add_product />} />
          <Route path="*" element={<Error />} />
        </Routes>
      <Footer/>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
