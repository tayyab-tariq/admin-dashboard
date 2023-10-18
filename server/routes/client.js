import express from 'express';
import { getProducts, getCustomers, getTransactions, getGeography, updateCustomer } from '../controllers/client.js';

const router = express.Router();

router.get('/products', getProducts);
router.route('/customers').get(getCustomers).put(updateCustomer);
router.get('/transactions', getTransactions);
router.get('/geography', getGeography);


export default router;
