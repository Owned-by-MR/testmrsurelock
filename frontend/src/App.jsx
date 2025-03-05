import React from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';


const App = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default App;

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