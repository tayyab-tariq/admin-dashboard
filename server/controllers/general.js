import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import OverallStat from '../models/OverallStat.js';
import Transaction from '../models/Transaction.js';

const getUser = asyncHandler (async (req, res) => { 
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
});

const getDashboard = asyncHandler (async (req, res) => { 
    
    const currentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-04-15';

    //  Recent Transactions
    const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });
    
    //  Get User Name from Transactions
    const userTransactions = await Promise.all(
        transactions.map(async (transaction) => {
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


    //  Overall Stats
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        salesByCategory,
    } = overallStat[0];

    const monthStat = overallStat[0].monthlyData.find(({ month }) => {
    return month === currentMonth;
    });

    const dailyStat = overallStat[0].dailyData.find(({ date }) => {
    return date == currentDay;
    });

    res.status(200).json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        salesByCategory,
        monthStat,
        dailyStat,
        transactions: userTransactions
    });
});

export { getUser, getDashboard};