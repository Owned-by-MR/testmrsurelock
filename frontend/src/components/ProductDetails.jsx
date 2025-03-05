import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: £{product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Active: {product.is_active ? 'Yes' : 'No'}</p>
      {product.image_urls?.length > 0 ? product.image_urls.map((url, index) => (
  <img key={index} src={url} alt={product.name} width="200" />
)) : <p>No images available</p>}
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default ProductDetails;