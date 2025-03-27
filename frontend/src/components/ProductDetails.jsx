import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductList.scss";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (location.state?.product) {
          setProduct(location.state.product);
        } else {
          throw new Error("No product found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [location.state]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>No product found</h2>;

  return (
    <div className="container">
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-full md:w-1/2">
          {product.image_urls && product.image_urls.length > 0 ? (
            <img
              src={product.image_urls[0]}
              alt={product.name}
              className="w-full h-auto rounded-md shadow-lg"
            />
          ) : (
            <p className="text-gray-500 text-center">No images available</p>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="text-gray-600 font-semibold p-2">Price:</td>
                <li className="p-2 text-right ml-4">{product.price}</li>
              </tr>
              <tr>
                <td className="text-gray-600 font-semibold p-2">Quantity:</td>
                <li className="p-2 text-right ml-4">{product.quantity}</li>
              </tr>
              <tr>
                <td className="text-gray-600 font-semibold p-2">Active:</td>
                <li className="p-2 text-right ml-4">{product.is_active ? "Yes" : "No"}</li>
              </tr>
            </tbody>
          </table>
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
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