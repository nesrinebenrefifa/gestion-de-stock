const mongoose = require('mongoose');

const VenteSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Vente = mongoose.model('Vente', VenteSchema);

module.exports = Vente;
