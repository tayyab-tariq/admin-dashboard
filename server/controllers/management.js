import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Transaction from "../models/Transaction.js";

const getAdmins = asyncHandler (async (req, res) => { 
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.status(200).json(admins);
});


const getUserPerformance = asyncHandler (async (req, res) => { 
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.status(200).json(admins);
});

export { getAdmins, getUserPerformance };