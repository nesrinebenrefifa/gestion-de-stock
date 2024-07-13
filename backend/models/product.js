const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    supplier: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema);

