// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductForm from './ProductForm';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Fetch products on component mount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         console.log('Fetching products...');
//         const response = await axios.get('http://localhost:5000/api/products'); // Correct backend API URL
//         console.log('Products fetched:', response.data);

//         setProducts(response.data);
//         setFilteredProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Search filter functionality
//   useEffect(() => {
//     const results = products.filter((product) =>
//       product.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [search, products]);

//   const handleProductAdded = (newProduct) => {
//     setProducts((prevProducts) => [...prevProducts, newProduct]);
//     setFilteredProducts((prevProducts) => [...prevProducts, newProduct]);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Product List</h1>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search by name..."
//         className="border p-2 mb-4 w-full rounded"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Product Form */}
//       <ProductForm onProductAdded={handleProductAdded} />

//       {/* Product Display */}
//       {filteredProducts.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {filteredProducts.map((product) => (
//             <div key={product.id} className="border p-4 rounded shadow">
//               <img
//                 src={product.image_urls[0]}
//                 alt={product.name}
//                 className="w-full h-40 object-cover mb-2 rounded"
//               />
//               <h2 className="text-lg font-semibold">{product.name}</h2>
//               <p>Price: ${product.price}</p>
//               <p>Quantity: {product.quantity}</p>
//               {product.is_active ? (
//                 <span className="text-green-600">Available</span>
//               ) : (
//                 <span className="text-red-600">Not Available</span>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No products found.</p>
//       )}
//     </div>
//   );
// };

// export default ProductList;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import ProductDetails from './ProductDetails';
import { Link } from 'react-router-dom';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '', is_active: false, image_urls: [''] });
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        console.log('Fetched Products:', response.data);
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Product:', newProduct);
    axios.post('http://localhost:5000/api/products', newProduct)
      .then(response => {
        console.log('Added Product:', response.data);
        setProducts([...products, response.data]);
        setNewProduct({ name: '', description: '', price: '', quantity: '', is_active: false, image_urls: [''] });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleEdit = (id) => {
    axios.put(`http://localhost:5000/api/products/${id}`, editProduct)
      .then(response => {
        console.log('Updated Product:', response.data);
        const updatedProducts = products.map(product => product.id === id ? response.data : product);
        setProducts(updatedProducts);
        setEditing(null);
        setEditProduct({});
      })
      .catch(error => console.error('Error updating product:', error));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          const updatedProducts = products.map(product =>
            product.id === id ? { ...product, is_active: false } : product
          );
          setProducts(updatedProducts.filter(product => product.is_active));
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search by Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Name *"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price *"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
        />
        <label>
          Active:
          <input
            type="checkbox"
            checked={newProduct.is_active}
            onChange={(e) => setNewProduct({ ...newProduct, is_active: e.target.checked })}
          />
        </label>
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image_urls[0]}
          onChange={(e) => setNewProduct({ ...newProduct, image_urls: [e.target.value] })}
        />
        <button type="submit">Add Product</button>
      </form>

      <ul>
        {products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())).map(product => (
          <li key={product.id} className="product-item">
            {editing === product.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={editProduct.name || product.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={editProduct.description || product.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={editProduct.price || product.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={editProduct.quantity || product.quantity}
                  onChange={(e) => setEditProduct({ ...editProduct, quantity: parseInt(e.target.value) })}
                />
                <label>
                  Active:
                  <input
                    type="checkbox"
                    checked={editProduct.is_active !== undefined ? editProduct.is_active : product.is_active}
                    onChange={(e) => setEditProduct({ ...editProduct, is_active: e.target.checked })}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editProduct.image_urls ? editProduct.image_urls[0] : product.image_urls[0]}
                  onChange={(e) => setEditProduct({ ...editProduct, image_urls: [e.target.value] })}
                />
                <button onClick={() => handleEdit(product.id)}>Save</button>
              </div>
            ) : (
              <div onClick={() => { setEditing(product.id); setEditProduct(product); }}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: £{product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Active: {product.is_active ? 'Yes' : 'No'}</p>
                {product.image_urls && product.image_urls[0] && (
                <Link to={`/product/${product.id}`}>
                    <img src={product.image_urls[0]} alt={product.name} width="100" />
                </Link>
                )}
              </div>
            )}
            
            
            <button onClick={() => handleDelete(product.id)}>Soft Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;













// import React, { useState, useEffect } from 'react';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch products when searchQuery changes
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError('');

//       try {
//         const response = await fetch(
//           `https://surelock.vercel.app/api/products?name=${searchQuery}`, // Include the search query in the request
//           {
//             method: 'GET',
//             headers: {
//               'Authorization': 'Bearer cc443bde-5845-45f9-aa37-be43df15107c',
//               'Content-Type': 'application/json'
//             },
//           }
//         );
//         const data = await response.json();

//         if (response.ok) {
//           setProducts(data);
//         } else {
//           setError('Failed to fetch products');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [searchQuery]); 

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Product List</h1>
//       <input
//         type="text"
//         placeholder="Search by product name"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className="search-input"
//       />
//       {loading && <p>Loading products...</p>}
//       {error && <p>{error}</p>}
      
//       {products.length === 0 && !loading && !error && (
//         <p>No products found</p> 
//       )}

//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product.id} className="product-item">
//             <h3>{product.name}</h3>
//             <p>Price: ${product.price}</p>
//             <p>Quantity: {product.quantity}</p>
//             {product.image_urls.length > 0 && (
//               <img src={product.image_urls[0]} alt={product.name} />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
