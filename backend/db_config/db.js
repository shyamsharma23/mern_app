const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const config = require('config');


const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(config.get('MONGO_URI'))

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (error){
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB