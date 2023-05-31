const express = require('express');
const orderRouter = express.Router();

const { orderModel } = require('../models/orderModel');
const { inventoryModel } = require('../models/inventoryModel');
orderRouter.get('/get-all-orders', async (req, res) => {
    const orders = await orderModel.find({})
    res.send(orders)
})

orderRouter.patch('/edit/:id', async (req, res) => {
    const { description } = req.body
    const id = req.params.id
    const order = await orderModel.findByIdAndUpdate(id, {$push: {description: description}}, {new: true})
    res.send(order)
});

orderRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const order = await orderModel.findById(id).populate('inventories')
    res.send(order)
});

module.exports = { orderRouter };