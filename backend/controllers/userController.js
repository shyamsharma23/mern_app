const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const config = require('config');



//@desc     Register new user
//@route    Post /api/users
//@access   Public

const registerUser = asyncHandler(async(req, res) =>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400)
        throw new Error('Please add all fields')
    }
// Check if the user exist
const userExists = await User.findOne({email})
if(userExists){
    return res.status(400)
    throw new Error('User already exists')
}

//Hash password
const salt = await bcrypt.genSalt(10);
const hasedPassword = await bcrypt.hash(password, salt);

//create user
const user = await User.create({
    name,
    email,
    password: hasedPassword
})

if(user){
    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
}else {
    return res.status(400)
    throw new Error('Invalid User data')
}


})


//@desc     authenticate user
//@route    Post /api/users/login
//@access   Public

const loginUser = asyncHandler(async(req, res) =>{

    const {email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        return res.status(400)
        throw new Error('Invalid credentials')

    }

    return res.json({message: 'login User'})

})


//@desc     Get user data
//@route    GET /api/users/me
//@access   PRIVATE

const getMe = asyncHandler(async(req, res) =>{
    const {_id, name, email} = await User.findById(req.user.id)
   
    return res.status(200).json({
        id: _id,
        name, 
        email
    })

})

const generateToken = (id) =>{
    return jwt.sign({id}, config.get('jwtSecret'), {expiresIn: '30d'})
}

module.exports={
    registerUser,
    loginUser,
    getMe
}