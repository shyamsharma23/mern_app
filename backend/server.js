require('dotenv').config();

const express = require("express");

const port = process.env.PORT || 3000
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./db_config/db')

const app = express();



connectDB();


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/goals', require('./routes/goalsRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})