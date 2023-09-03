const express = require("express");
const dotenv = require('dotenv').config();
const port = 3000
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./db_config/db')

const app = express();



connectDB();


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/goals', require('./routes/goalsRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})