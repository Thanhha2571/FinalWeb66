const express = require('express');
const userRouter = express.Router();

const { userModel } = require('../models/userModel');

const authorCheck = (req, res, next) => {
    const username = req.user.username;
    
    if (username === "admin") {
        next();
    }
    else {
        res.send("You are not an admin")
    }
};
userRouter.get('/profile',(req, res) => {
    const user = req.user;
    res.send(user)
})

userRouter.get('/get-all-users',authorCheck, async (req, res) => {
    const users = await userModel.find({})
    res.send(users)
})
module.exports = { userRouter}