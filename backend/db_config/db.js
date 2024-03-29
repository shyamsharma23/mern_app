require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');


const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(config.get('MONGO_URI'))
        // const conn = await mongoose.connect("process.env.MONGO_URI")


        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (error){
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB