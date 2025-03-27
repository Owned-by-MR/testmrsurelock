import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.scss";

const API_URL = "http://localhost:5000/api/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    is_active: true,
    image_urls: [""],
  });
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [editProduct, setEditProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newProduct);
      await fetchProducts();
      setNewProduct({ name: "", price: "", quantity: "", is_active: true, image_urls: [""] });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.patch(API_URL, [{ ...editProduct, id }]);
      await fetchProducts();
      setEditing(null);
      setEditProduct({});
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to soft delete this product?")) {
      try {
        await axios.delete(API_URL, { headers: { 'Content-Type': 'application/json' }, data: [id] });
        setProducts(prevProducts => prevProducts.map(product => product.id === id ? { ...product, is_active: false } : product));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center text-2xl font-bold">Products</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-4">
        <input type="text" placeholder="Name *" className="input" value={newProduct.name} onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))} required />
        <input type="number" placeholder="Price *" className="input" value={newProduct.price} onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))} required />
        <input type="number" placeholder="Quantity" className="input" value={newProduct.quantity} onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) }))} />
        <label className="flex items-center">
          Active: <input type="checkbox" className="ml-2" checked={newProduct.is_active} onChange={(e) => setNewProduct(prev => ({ ...prev, is_active: e.target.checked }))} />
        </label>
        <input type="text" placeholder="Image URL" className="input" value={newProduct.image_urls[0]} onChange={(e) => setNewProduct(prev => ({ ...prev, image_urls: [e.target.value] }))} />
        <button type="submit" className="btn-primary">Add Product</button>
      </form>
      <input type="text" placeholder="Search by Name" className="input mb-4" value={search} onChange={(e) => setSearch(e.target.value)} />
      <ul className="p-2">
        {products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
          <li key={product.id} className="product-item">
            {editing === product.id ? (
              <div>
                <input type="text" className="input" value={editProduct.name || product.name} onChange={(e) => setEditProduct(prev => ({ ...prev, name: e.target.value }))} />
                <input type="number" className="input" value={editProduct.price || product.price} onChange={(e) => setEditProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))} />
                <input type="number" className="input" value={editProduct.quantity || product.quantity} onChange={(e) => setEditProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) }))} />
                <label className="flex items-center flex-wrap max-w-[400px]">
                  Active:<input type="checkbox" className="ml-2" checked={editProduct.is_active !== undefined ? editProduct.is_active : product.is_active} onChange={(e) => setEditProduct(prev => ({ ...prev, is_active: e.target.checked }))} />
                </label>
                <input type="text" className="input" value={editProduct.image_urls ? editProduct.image_urls[0] : product.image_urls[0]} onChange={(e) => setEditProduct(prev => ({ ...prev, image_urls: [e.target.value] }))} />
                <div><button onClick={() => handleEdit(product.id)} className="btn-primary">Save</button></div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <li><div>Price:</div><div>£{product.price}</div></li>
                <li><div>Quantity:</div><div>{product.quantity}</div></li>
                <li><div>Active:</div><div>{product.is_active ? "Yes" : "No"}</div></li>
                {product.image_urls && product.image_urls[0] && (
                  <Link to={`/product`} state={{ product }}>
                    <img src={product.image_urls[0]} alt={product.name} className="w-24 rounded" />
                  </Link>
                )}
                <div><button onClick={() => setEditing(product.id)} className="btn-secondary">Edit</button></div>
              </div>
            )}
            <button><button-red onClick={() => handleDelete(product.id)} className="button-red">Soft Delete</button-red></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ProductList.css';
// import ProductDetails from './ProductDetails';
// import { Link } from 'react-router-dom';


// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '', is_active: false, image_urls: [''] });
//   const [search, setSearch] = useState('');
//   const [editing, setEditing] = useState(null);
//   const [editProduct, setEditProduct] = useState({});

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products')
//       .then(response => {
//         console.log('Fetched Products:', response.data);
//         setProducts(response.data);
//       })
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting Product:', newProduct);
//     axios.post('http://localhost:5000/api/products', newProduct)
//       .then(response => {
//         console.log('Added Product:', response.data);
//         setProducts([...products, response.data]);
//         setNewProduct({ name: '', description: '', price: '', quantity: '', is_active: false, image_urls: [''] });
//       })
//       .catch(error => console.error('Error adding product:', error));
//   };

//   const handleEdit = (id) => {
//     axios.put(`http://localhost:5000/api/products/${id}`, editProduct)
//       .then(response => {
//         console.log('Updated Product:', response.data);
//         const updatedProducts = products.map(product => product.id === id ? response.data : product);
//         setProducts(updatedProducts);
//         setEditing(null);
//         setEditProduct({});
//       })
//       .catch(error => console.error('Error updating product:', error));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       axios.delete(`http://localhost:5000/api/products/${id}`)
//         .then(() => {
//           const updatedProducts = products.map(product =>
//             product.id === id ? { ...product, is_active: false } : product
//           );
//           setProducts(updatedProducts.filter(product => product.is_active));
//         })
//         .catch(error => console.error('Error deleting product:', error));
//     }
//   };

//   return (
//     <div className="product-list">
//       <h1>Products</h1>
//       <input
//         type="text"
//         placeholder="Search by Name"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <form onSubmit={handleSubmit} className="product-form">
//         <input
//           type="text"
//           placeholder="Name *"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={newProduct.description}
//           onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price *"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={newProduct.quantity}
//           onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
//         />
//         <label>
//           Active:
//           <input
//             type="checkbox"
//             checked={newProduct.is_active}
//             onChange={(e) => setNewProduct({ ...newProduct, is_active: e.target.checked })}
//           />
//         </label>
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newProduct.image_urls[0]}
//           onChange={(e) => setNewProduct({ ...newProduct, image_urls: [e.target.value] })}
//         />
//         <button type="submit">Add Product</button>
//       </form>

//       <ul>
//         {products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())).map(product => (
//           <li key={product.id} className="product-item">
//             {editing === product.id ? (
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={editProduct.name || product.name}
//                   onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Description"
//                   value={editProduct.description || product.description}
//                   onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Price"
//                   value={editProduct.price || product.price}
//                   onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Quantity"
//                   value={editProduct.quantity || product.quantity}
//                   onChange={(e) => setEditProduct({ ...editProduct, quantity: parseInt(e.target.value) })}
//                 />
//                 <label>
//                   Active:
//                   <input
//                     type="checkbox"
//                     checked={editProduct.is_active !== undefined ? editProduct.is_active : product.is_active}
//                     onChange={(e) => setEditProduct({ ...editProduct, is_active: e.target.checked })}
//                   />
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Image URL"
//                   value={editProduct.image_urls ? editProduct.image_urls[0] : product.image_urls[0]}
//                   onChange={(e) => setEditProduct({ ...editProduct, image_urls: [e.target.value] })}
//                 />
//                 <button onClick={() => handleEdit(product.id)}>Save</button>
//               </div>
//             ) : (
//               <div onClick={() => { setEditing(product.id); setEditProduct(product); }}>
//                 <h3>{product.name}</h3>
//                 <p>{product.description}</p>
//                 <p>Price: £{product.price}</p>
//                 <p>Quantity: {product.quantity}</p>
//                 <p>Active: {product.is_active ? 'Yes' : 'No'}</p>
//                 {product.image_urls && product.image_urls[0] && (
//                 <Link to={`/product/${product.id}`}>
//                     <img src={product.image_urls[0]} alt={product.name} width="100" />
//                 </Link>
//                 )}
//               </div>
//             )}
            
            
//             <button onClick={() => handleDelete(product.id)}>Soft Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;
