import Product from "../models/Product.js";
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import ProductStat from "../models/ProductStat.js";
import asyncHandler from 'express-async-handler';
import getCountryIso3 from "country-iso-2-to-3";

const getProducts = asyncHandler (async (req, res) => { 
    const products = await Product.find();

    const productsWithStats = await Promise.all(
        products.map(async(product) => {
            const stat = await ProductStat.find({
                productId: product._id,
            })
            const stats = stat[0];
            return {
                ...product._doc,
                stats,
            }
        })
    );

    res.status(200).json(productsWithStats);
});

const getCustomers = asyncHandler (async (req, res) => { 
    const customers = await User.find({ role: 'user' }).select('-password');
    res.status(200).json(customers);
});

const updateCustomer = asyncHandler (async (req, res) => { 
    const userId = req.body._id;

    const updateQuery = {
        $set: req.body, // Use the request body to update the document
    };

    // Use Mongoose to update the document by ID
    const updatedDocument = await User.findByIdAndUpdate(userId, updateQuery, { new: true, runValidators: true  });

    res.json(updatedDocument);
    
});

const getTransactions = asyncHandler (async (req, res) => { 
    // sort will look like this: { "filed": "userid", "sort": "desc" }
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
            [sortParsed.field]: sortParsed.sort = 'asc' ? 1 : -1
        };
        return sortFormatted;
    }

    const sortFormatted = Boolean(sort) ? generateSort() : {};              //      Check if sort exists or not

    const transactions = await Transaction.find({
        $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
        ]
    })
    .sort(sortFormatted)
    .skip(pageSize * page)
    .limit(pageSize);

    const total = await Transaction.countDocuments({
        $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
        ]
    });

    res.status(200).json({
        transactions,
        total,
    });
});

const getGeography = asyncHandler (async (req, res) => { 
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryIso3(country);
        if (!acc[countryISO3]){
            acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
    }, {});


    const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
            return {id: country, value: count}
        }
    );

    res.status(200).json(formattedLocations);
});

export { getProducts, getCustomers, getTransactions, getGeography, updateCustomer };