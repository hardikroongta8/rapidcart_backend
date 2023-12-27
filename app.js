if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./handlers/errorHandler');
const db = require('./utils/db-config');
const cors = require('cors');
const router = require('./routers/router');
const app = express();
const cookieParser = require('cookie-parser');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN_URL,
    methods: "GET,PUT,POST,DELETE",
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routers
app.use('/auth', router.authRouter);
app.use('/product', router.productRouter);

// Error Handler
app.use(errorHandler);

// Connecting to the server
app.listen(process.env.PORT, async() => {
    console.log(`Listening to server at port ${process.env.PORT}...`);
    try {
        await db.connect();
        console.log('Connected to database.');
    } catch (error) {
        console.error(error);
    }
});