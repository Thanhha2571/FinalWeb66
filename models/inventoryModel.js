const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web66')

const inventorySchema = new mongoose.Schema({
    _id: String,
    sku: String,
    description: String,
    instock: String
});

const inventoryModel = mongoose.model('inventories', inventorySchema);

module.exports = { inventoryModel};