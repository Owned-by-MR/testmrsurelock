import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import ProductDetails from './components/ProductDetails';
import './components/ProductList.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<ProductDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
