const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = 4000
const cors = require("cors");
app.use(express.json());
const { inventoryRouter } = require('./routes/inventory');
const { userRouter } = require('./routes/user');
const { userModel } = require('./models/userModel');
const { orderRouter } = require('./routes/order');

const authenCheck = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        let decoded = jwt.verify(token, "PRIVATE KEY");
        let { username} = decoded;
        let user = await userModel.findOne({ username: username})
        if (user) {
            req.user = user;
            next();
        }
        else {
            res.send("User is not found");
        }  
    }catch (err) {
        res.status(401).send(err.message);
    }
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username: username });

    if (user && user.password === password) {
        const token = jwt.sign({ username: username }, "PRIVATE KEY", { expiresIn: "1h" })
        res.send({ token });
    }
    else if(user && user.password !== password) {
        res.send("Password is incorrect");
    }
    else {
        res.send("User is not exist")
    }
})

app.use('/inventory',authenCheck, inventoryRouter);
app.use('/user',authenCheck, userRouter);
app.use('/order', orderRouter)
app.listen(port);
console.log('Sever is running');

