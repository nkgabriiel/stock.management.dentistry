const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/error.middleware');
const productRouter = require('./modules/products/product.routes')
const authRouter = require('./modules/auth/auth.routes');
require('dotenv').config();

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', productRouter)
app.use('/api/auth', authRouter)

app.get('/health', (req, res) => {
    res.json({status: 'ok'});
});

app.use(errorMiddleware);

module.exports = app;