const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
const Product = require('./models/product');
const dotenv = require("dotenv").config();
const Vente = require('./models/Vente');
const Facture = require('./models/Factures');



const app = express();
app.use(express.json());
app.use(cors());
 

//Connexion to database "mongodb"
app.use(express.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
const URI = process.env.URI;
mongoose
  .connect(process.env.URI)
  .then(() => {

    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection to database failed!");
  });

//******************** ******************************/

// To post / insert data into database
app.post('/register', (req, res)=>{

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})
// To find record from the database
app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})
//************************************** */


//API
//add product

app.post('/add',async (req, res) => {
    const { name, description, quantity, purchasePrice, salePrice, supplier } = req.body;

    try {
        const newProduct = new Product({ name, description, quantity, purchasePrice, salePrice, supplier });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})
//edit product
app.put('/edit/:id',async (req, res) => {
    const { name, description, quantity, purchasePrice, salePrice, supplier } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json("Product not found");
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.quantity = quantity || product.quantity;
        product.purchasePrice = purchasePrice || product.purchasePrice;
        product.salePrice = salePrice || product.salePrice;
        product.supplier = supplier || product.supplier;

        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
})
//delet product
app.delete('/delete/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
//get product
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json(err);
    }
});
//**************************************************suivi de ventes  */


app.post('/ventes', async (req, res) => {
    const { productName, quantity, price } = req.body;
         try {
        const newVente = new Vente({ productName, quantity, price });
         await newVente.save();
      res.status(201).json(newVente);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create sale', error });
    }
  });
  
  app.get('/ventes', async (req, res) => {
    try {
      const ventes = await Vente.find();
      res.json(ventes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch sales', error });
    }
  });
  
//*******************************Factures***************** */
app.post('/factures', async (req, res) => {
  const { clientName, clientEmail, date, items, totalAmount } = req.body;
       try {
      const newFacture = new Facture({ clientName, clientEmail, date, items, totalAmount});
       await newFacture.save();
    res.status(201).json(newFacture);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create sale', error });
  }
});

app.get('/factures', async (req, res) => {
  try {
    const Factures = await Facture.find();
    res.json(Factures);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales', error });
  }
});
//****************************** */
// let factures=[];
// // Routes pour les factures
// app.post('/factures', (req, res) => {
//     const newFacture = { ...req.body, id: Date.now() };
//     factures.push(newFacture);
//     res.status(201).json(newFacture);
// });

// app.get('/factures', (req, res) => {
//     res.json(factures);
// });
//****************************list de vente *********************/

module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));