import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import productRoutes from './api/productRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const app = express();
// const port = 5000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174']
// }));

// app.use(express.json());

// let products = [];

// function loadProducts() {
//   try {
//     const data = fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf-8');
//     products = JSON.parse(data);
//     console.log('Products loaded:', products);
//   } catch (err) {
//     console.error('Failed to load products.json:', err);
//   }
// }

// loadProducts();

// function saveProductsToFile() {
//   try {
//     fs.writeFileSync(path.join(__dirname, 'data', 'products.json'), JSON.stringify(products, null, 2));
//     console.log('Products saved to file');
//   } catch (err) {
//     console.error('Failed to save products.json:', err);
//   }
// }

// app.get('/api/products', (req, res) => {
//   const activeProducts = products.filter(product => product);
//   res.json(activeProducts);
// });

// app.get('/api/products/:id', (req, res) => {
//     res.json(products);
// });

// app.post('/api/products', (req, res) => {
//   const newProduct = {
//     id: products.length ? products[products.length - 1].id + 1 : 1,
//     ...req.body
//   };
//   products.push(newProduct);
//   saveProductsToFile();
//   res.status(201).json(newProduct);
// });

// app.put('/api/products/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = products.findIndex(p => p.id === id);
//   if (index !== -1) {
//     products[index] = { ...products[index], ...req.body };
//     saveProductsToFile();
//     res.json(products[index]);
//   } else {
//     res.status(404).json({ message: 'Product not found' });
//   }
// });

// app.delete('/api/products/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = products.findIndex(p => p.id === id);
    
//     if (index !== -1) {
//       products[index].is_active = false;
//       saveProductsToFile(); 
//       res.json(products[index]); 
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   });

// app.use('/data', express.static(path.join(__dirname, 'data')));

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
