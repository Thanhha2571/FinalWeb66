const express = require('express');
const inventoryRouter = express.Router();
const jwt = require('jsonwebtoken');
const { inventoryModel } = require('../models/inventoryModel');

inventoryRouter.get('/get-all-inventory', async (req, res) => {
    const inventory = await inventoryModel.find({})
    res.send(inventory)
})

inventoryRouter.get('/get-low-inventory', async (req, res) => {
    const inventory = await inventoryModel.find({})
    let low_inventory = inventory.filter((item) => Number(item.instock) < 100)
    console.log(low_inventory)
    res.send(low_inventory)
})

inventoryRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const inventory = await inventoryModel.find({})
    const inventory_id = inventory.filter((item) => item.id === id)
    res.send(inventory_id)
})
module.exports = { inventoryRouter };