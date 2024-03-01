import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter,  Route, Routes } from 'react-router-dom';

// strony
  import Index from '../app/screens'
  import Login from '../app/screens/login'
  import Error from '../app/screens/error';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
