import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const getProducts = async (req, res) => {
  try {
    const queryParams = req.query;

    let url = `${API_URL}`;
    
    let allProducts = [];

    if (!queryParams.is_active) {
      let activeProductsResponse = await axios.get(`${url}?is_active=true`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      let inactiveProductsResponse = await axios.get(`${url}?is_active=false`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      allProducts = [...activeProductsResponse.data, ...inactiveProductsResponse.data];
    } 
    else {
      url += `?is_active=${queryParams.is_active}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      allProducts = response.data;
    }

    res.json(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const response = await axios.post(API_URL, req.body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
};

export const updateProduct = async (req, res) => {
  const updateData = req.body;

  try {
    const response = await axios.patch(
      API_URL,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    res.status(200).json({
      message: 'Product(s) updated successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('Error updating product(s):', error.response?.data || error.message);
    res.status(500).json({
      message: 'Failed to update product(s)',
      error: error.response?.data || error.message,
    });
  }
};

export const softDeleteProducts = async (req, res) => {
  try {
    const productIds = req.body;

    if (
      !productIds ||
      (Array.isArray(productIds) && productIds.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: 'Provide at least one product ID to soft delete.' });
    }

    const response = await axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: productIds,
    });

    res.status(200).json({
      message: 'Products soft deleted successfully',
      result: response.data,
    });
  } catch (error) {
    console.error('Soft delete failed:', error.response?.data || error.message);
    res.status(500).json({
      message: 'Error soft deleting products',
      error: error.response?.data || error.message,
    });
  }
};





// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const productsFilePath = path.join(__dirname, '../data/products.json');

// export const getProducts = (req, res) => {
//   fs.readFile(productsFilePath, 'utf8', (err, data) => {
//     if (err) {
//       res.status(500).json({ message: 'Error reading products file' });
//       return;
//     }
//     const products = JSON.parse(data);
//     res.json(products);
//   });
// };

// export const addProduct = (req, res) => {
//   const newProduct = req.body;

//   fs.readFile(productsFilePath, 'utf8', (err, data) => {
//     if (err) {
//       res.status(500).json({ message: 'Error reading products file' });
//       return;
//     }

//     const products = JSON.parse(data);
//     newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
//     products.push(newProduct);

//     fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
//       if (err) {
//         res.status(500).json({ message: 'Error saving product' });
//         return;
//       }
//       res.status(201).json(newProduct);
//     });
//   });
// };
// export const updateProduct = (req, res) => {
//     const { id } = req.params;
//     const updatedProduct = req.body;
  
//     fs.readFile(productsFilePath, 'utf8', (err, data) => {
//       if (err) {
//         res.status(500).json({ message: 'Error reading products file' });
//         return;
//       }
  
//       let products = JSON.parse(data);
//       const index = products.findIndex(product => product.id === parseInt(id));
  
//       if (index === -1) {
//         res.status(404).json({ message: 'Product not found' });
//         return;
//       }
  
//       products[index] = { ...products[index], ...updatedProduct };
  
//       fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
//         if (err) {
//           res.status(500).json({ message: 'Error updating product' });
//           return;
//         }
//         res.status(200).json(products[index]);
//       });
//     });
//   };

//   export const deleteProduct = (req, res) => {
//     const { id } = req.params;
//     let products = getProducts();
  
//     const productIndex = products.findIndex((p) => p.id == id);
//     if (productIndex === -1) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
  
//     products[productIndex].is_active = false;
//     fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
//     res.json({ message: 'Product soft deleted' });
//   };



// import fs from 'fs';
// import path from 'path';

// const getProducts = (req, res) => {
//   const productsPath = path.join(__dirname, '../data/products.json');

//   fs.readFile(productsPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading products.json:', err);
//       return res.status(500).json({ error: 'Failed to fetch products' });
//     }

//     const products = JSON.parse(data);

//     res.json(products);
//   });
// };

// export { getProducts };
