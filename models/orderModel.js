const mongoose = require('mongoose')   
mongoose.connect('mongodb://localhost:27017/web66')

const orderSchema = new mongoose.Schema({
    _id: String,
    item: String,
    price: String,
    quantity: String,
    description : [{ type: mongoose.Schema.Types.String, ref: 'inventories' }]
})

const orderModel = mongoose.model('orders', orderSchema)
module.exports = { orderModel}