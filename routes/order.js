const express = require('express');
const orderRouter = express.Router();

const { orderModel } = require('../models/orderModel');
const { inventoryModel } = require('../models/inventoryModel');
orderRouter.get('/get-all-orders', async (req, res) => {
    const orders = await orderModel.find({})
    res.send(orders)
})

orderRouter.patch('/edit/:id', async (req, res) => {
    const { inventory_id } = req.body
    // console.log(inventory_id );
    const id = req.params.id
    const description_id = await inventoryModel.findById(inventory_id)
    // console.log(description_id);
    // const description = await inventoryModel.find({ description: description_id.description })
    console.log(typeof(description_id.description));
    console.log(typeof(orderModel.description));

    const order = await orderModel.findByIdAndUpdate(id, {$set: {description: description_id.description}}, {new: true})
    console.log(order._id);
    res.send(order)
});

orderRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const order = await orderModel.findById(id).populate('inventories')
    res.send(order)
});

module.exports = { orderRouter };