const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');


//@desc     get goals
//@route    /api/goals
//@access   PRIVATE
const getGoals = asyncHandler(async (req, res) =>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals);
})

//@desc     set goal
//@route    /api/goals
//@access   PRIVATE
const setGoal = asyncHandler(async (req, res) =>{
    if(!req.body.text){
        return res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    return res.status(200).json(goal)
})

//@desc     update goal
//@route    /api/goals/:id
//@access   PRIVATE
const updateGoal= asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
         return res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        return res.status(401)
        throw new Error('User not found')
    }
    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
         return res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    return res.status(200).json(updatedGoal);
})

//@desc     delete goal
//@route    /api/goals/:id
//@access   PRIVATE
const deleteGoal = asyncHandler(async (req, res) =>{

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        return res.status(400)
        throw new Error('Goal not found')
    }
    
    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        return res.status(401)
        throw new Error('User not found')
    }
    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        return res.status(401)
        throw new Error('User not authorized')
    }
    await goal.remove();

    return res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}