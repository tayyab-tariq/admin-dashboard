import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Transaction from "../models/Transaction.js";
import mongoose from 'mongoose';

const getAdmins = asyncHandler (async (req, res) => { 
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.status(200).json(admins);
});


const getUserPerformance = asyncHandler (async (req, res) => { 
    const { id } = req.params;
    const userWithStats = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) }},
        {
            $lookup: {
                from: 'affiliatestats',                         //  table
                localField: '_id',
                foreignField: 'userId',
                as: 'affiliateStats'                            //  save information in property
            },
        },
        { $project: {
                password: 0,
            } 
        },
        { $unwind: '$affiliateStats' }                           //  Flatten the information
    ]);

    const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id) => {
            return Transaction.findById(id);
        })
    );

    const filteredTransactions = saleTransactions.filter((transaction) => {
        return transaction !== null
    });


    //  Get Name
    const userTransactions = await Promise.all(
        filteredTransactions.map(async (transaction) => {
            const userTransaction = await User.find({
            _id: transaction.userId,
            }).select('name');
            const name = userTransaction[0].name;
            
            return {
                ...transaction._doc,
                name,
            };
        })
    );  

    res.status(200).json({
        user: userWithStats[0],
        sales: userTransactions
    });
});

export { getAdmins, getUserPerformance };