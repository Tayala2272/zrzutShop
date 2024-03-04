import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter,  Route, Routes } from 'react-router-dom';

// Auth
  import { AuthContextProvider } from '../app/hooks/auth';

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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Error />} />
        </Routes>
      <Footer/>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
