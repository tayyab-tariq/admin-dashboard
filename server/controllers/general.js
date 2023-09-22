import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const getUser = asyncHandler (async (req, res) => { 
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
});

export { getUser};