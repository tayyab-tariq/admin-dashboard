import asyncHandler from 'express-async-handler';
import OverallStat from '../models/OverallStat.js';

const getSales = asyncHandler (async (req, res) => { 
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
});

export { getSales };