const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


// require all the routes here
const authRouter = require('./routes/authRoutes');
const foodRouter=require('./routes/foodRoutes')
const donationRouter=require('./routes/donationRoutes')
const predictionRouter = require('./routes/predictionRoutes');

//using all routes here
app.use('/api/auth', authRouter);
app.use('/api/food',foodRouter)
app.use('/api/donations',donationRouter)
app.use('/api/predict', predictionRouter);

module.exports = app;