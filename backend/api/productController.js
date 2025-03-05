import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productsFilePath = path.join(__dirname, '../data/products.json');

export const getProducts = (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading products file' });
      return;
    }
    const products = JSON.parse(data);
    res.json(products);
  });
};

export const addProduct = (req, res) => {
  const newProduct = req.body;

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading products file' });
      return;
    }

    const products = JSON.parse(data);
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(newProduct);

    fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error saving product' });
        return;
      }
      res.status(201).json(newProduct);
    });
  });
};
export const updateProduct = (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
  
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Error reading products file' });
        return;
      }
  
      let products = JSON.parse(data);
      const index = products.findIndex(product => product.id === parseInt(id));
  
      if (index === -1) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
  
      products[index] = { ...products[index], ...updatedProduct };
  
      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: 'Error updating product' });
          return;
        }
        res.status(200).json(products[index]);
      });
    });
  };

  export const deleteProduct = (req, res) => {
    const { id } = req.params;
    let products = getProducts();
  
    const productIndex = products.findIndex((p) => p.id == id);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    products[productIndex].is_active = false;
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json({ message: 'Product soft deleted' });
  };



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


// const axios = require('axios');
// const API_URL = 'https://surelock.vercel.app/api/products';
// const API_KEY = process.env.API_KEY;

// const headers = {
//     'Authorization': `Bearer ${API_KEY}`,
//     'Content-Type': 'application/json',
// };

// const getProducts = async (req, res) => {
//     try {
//         const response = await axios.get(API_URL, { headers });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Example for other functions
// const createProduct = async (req, res) => {
//     // Your implementation here
// };

// const updateProduct = async (req, res) => {
//     // Your implementation here
// };

// const deleteProduct = async (req, res) => {
//     // Your implementation here
// };

// module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
