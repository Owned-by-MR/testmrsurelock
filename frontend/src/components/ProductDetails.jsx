import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product] = useState(location.state?.product || {});
  const [loading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    console.log('Location State:', location.state);
    console.log('Product:', product);
  }, [location.state, product]);

  if (!product.id) {
    return <h2>No product found</h2>;
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: £{product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Active: {product.is_active ? "Yes" : "No"}</p>
      {product.image_urls && product.image_urls.length > 0 ? (
        product.image_urls.map((url, index) => (
          <img key={index} src={url} alt={product.name} width="200" />
        ))
      ) : (
        <p>No images available</p>
      )}
      <br />
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default ProductDetails;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/products/${id}`)
//       .then(response => setProduct(response.data))
//       .catch(error => console.error('Error fetching product:', error));
//   }, [id]);

//   if (!product) return <h2>Loading...</h2>;

//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>{product.description}</p>
//       <p>Price: £{product.price}</p>
//       <p>Quantity: {product.quantity}</p>
//       <p>Active: {product.is_active ? 'Yes' : 'No'}</p>
//       {product.image_urls?.length > 0 ? product.image_urls.map((url, index) => (
//   <img key={index} src={url} alt={product.name} width="200" />
// )) : <p>No images available</p>}
//       <button onClick={() => window.history.back()}>Go Back</button>
//     </div>
//   );
// };

// export default ProductDetails;