import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, '../data/products.json');

const getProducts = () => JSON.parse(fs.readFileSync(productsFilePath));

router.get('/', (req, res) => {
  res.json(getProducts());
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  const products = getProducts();
  
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1; // Auto-increment ID
  products.push(newProduct);

  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});
router.put('/:id', (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const updatedProduct = req.body;
      const products = getProducts();
      const productIndex = products.findIndex((p) => p.id === productId);
  
      if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
  
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.json(products[productIndex]);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error updating product' });
    }
  
  });
  router.delete('/:id', (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const products = getProducts();
      const productIndex = products.findIndex((p) => p.id === productId);
  
      if (productIndex !== -1) {
        products[productIndex].is_active = false;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.json({ message: 'Product soft deleted', product: products[productIndex] });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error deleting product' });
    }
  });
export default router;



// const express = require('express');
// const { getProducts, createProduct, updateProduct, deleteProduct } = require('./productController');

// const router = express.Router();

// router.get('/products', getProducts);
// router.post('/products', createProduct);
// router.patch('/products', updateProduct);
// router.delete('/products', deleteProduct);

// module.exports = router;
