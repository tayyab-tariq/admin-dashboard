import express from 'express';
import { getProducts, getCustomers, getTransactions, getGeography, updateCustomer, deleteCustomer, addCustomer } from '../controllers/client.js';

const router = express.Router();

router.get('/products', getProducts);
router.route('/customers').get(getCustomers).post(addCustomer).put(updateCustomer).delete(deleteCustomer);
router.get('/transactions', getTransactions);
router.get('/geography', getGeography);


export default router;
