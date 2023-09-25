import Product from "../models/Product.js";
import User from '../models/User.js';
import ProductStat from "../models/ProductStat.js";
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler (async (req, res) => { 
    const products = await Product.find();

    const productsWithStats = await Promise.all(
        products.map(async(product) => {
            const stat = await ProductStat.find({
                productId: product._id,
            })

            return {
                ...product._doc,
                stat,
            }
        })
    );

    res.status(200).json(productsWithStats);
});

const getCustomers = asyncHandler (async (req, res) => { 
    const customers = await User.find({ role: 'user' }).select('-password');
    res.status(200).json(customers);
});


export { getProducts, getCustomers };