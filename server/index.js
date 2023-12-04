import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

/* DATA IMPORTS */
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AFfiliateStat from './models/AffiliateStat.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from './data/index.js';

/* CONFIGURATION */
dotenv.config();
const PORT = process.env.PORT || 5000;

await connectDB();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    
    /* ADD DATA ONCE */
    // AFfiliateStat.insertMany(dataAffiliateStat);
    // User.insertMany(dataUser);
    // Transaction.insertMany(dataTransaction);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // OverallStat.insertMany(dataOverallStat);
})