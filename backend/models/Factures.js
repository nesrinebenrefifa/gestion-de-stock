const mongoose = require('mongoose');

const FacturesSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: Date, default: Date.now },
  items: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
});

const Facture = mongoose.model('Facture', FacturesSchema);

module.exports = Facture;
