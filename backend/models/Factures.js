const mongoose = require('mongoose');

const FacturesSchema = new mongoose.Schema({
 
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    date: { type: Date,  required: true,default: Date.now },
    items: [
      {
        Number: { type: String, required: true, unique: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    MatriculeFiscale: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    period: { type: String, required: true },
    intervenant: { type: String, required: true }
  });
  

const Facture = mongoose.model('Facture', FacturesSchema);

module.exports = Facture;

