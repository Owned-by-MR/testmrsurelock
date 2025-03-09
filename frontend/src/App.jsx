import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading product list...</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default App;





// import React from 'react';
// import ProductList from './components/ProductList';
// import ProductDetails from './components/ProductDetails';


// const App = () => {
//   return (
//     <div>
//       <ProductList />
//     </div>
//   );
// };

// export default App;

// import { useState, useEffect } from 'react';
// import ProductList from './components/ProductList';
// import ProductForm from './components/ProductForm';
// import ProductDetail from './components/ProductDetail'; 

// import axios from 'axios';

// const App = () => {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:5000/products');
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <ProductForm refreshProducts={fetchProducts} />
//       <ProductList products={products} />
//       <ProductDetail />
//     </div>
//   );
// };

// export default App;