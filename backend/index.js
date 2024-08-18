const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
const Product = require('./models/product');
const dotenv = require("dotenv").config();
const Vente = require('./models/Vente');
const Facture = require('./models/Factures');
const Supplier = require('./models/supplier')



const app = express();
app.use(express.json());
app.use(cors());
 

//Connexion to database "mongodb"
app.use(express.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
const URI = process.env.URI;
mongoose
  .connect(URI)
  .then(() => {

    console.log("Connected to database !");
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

// Add a new supplier
app.post('/suppliers/add', async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
      const newSupplier = new Supplier({ firstName, lastName, email, phone });
      await newSupplier.save();
      res.status(201).json(newSupplier);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Edit supplier
app.put('/suppliers/edit/:id', async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) {
          return res.status(404).json("Supplier not found");
      }

      supplier.firstName = firstName || supplier.firstName;
      supplier.lastName = lastName || supplier.lastName;
      supplier.email = email || supplier.email;
      supplier.phone = phone || supplier.phone;

      await supplier.save();
      res.status(200).json(supplier);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Delete supplier
app.delete('/suppliers/delete/:id', async (req, res) => {
  try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) {
          return res.status(404).json({ message: "Supplier not found" });
      }
      await Supplier.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Supplier deleted" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
// Get all suppliers
app.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//************************************** */


//API
//add product
app.post('/add', async (req, res) => {
  const { name, description, quantity, purchasePrice, salePrice, supplier } = req.body;

  try {
    const newProduct = new Product({ name, description, quantity, purchasePrice, salePrice, supplier });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
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
app.get('/products', async (req, res) => {
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
    // Vérifiez que le produit existe et a une quantité suffisante
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough quantity in stock' });
    }

    // Créez une nouvelle vente
    const newVente = new Vente({ productName,quantity, price, date: new Date() // Vous pouvez ajouter la date de la vente si nécessaire
 });

    // Enregistrez la vente dans la base de données
    await newVente.save();

    // Mettez à jour la quantité du produit en stock
    product.quantity -= quantity;
    await product.save();

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
  const { clientName, clientEmail, date, MatriculeFiscale, paymentMethod, period, intervenant, items, totalAmount } = req.body;

  try {
    const newFacture = new Facture({
      clientName,
      clientEmail,
      date,
      MatriculeFiscale,
      paymentMethod,
      period,
      intervenant,
      items,
      totalAmount
    });
    await newFacture.save();
    res.status(201).json(newFacture);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create facture', error });
  }
});


// Route GET pour récupérer toutes les factures
app.get('/factures', async (req, res) => {
  try {
    const factures = await Facture.find();
    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch factures', error });
  }
});
//****************************** */
// Route pour récupérer tous les produits
app.get('/stock-overview', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stock overview', error: err });
  }
});
// Route pour récupérer les ventes du jour
app.get('/daily-sales-summary', async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const dailySales = await Vente.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    res.status(200).json(dailySales);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch daily sales summary', error: err });
  }
});
// Route pour récupérer les produits avec un stock bas
app.get('/low-stock-alerts', async (req, res) => {
  const lowStockThreshold = 10; // Vous pouvez ajuster ce seuil selon vos besoins

  try {
    const lowStockProducts = await Product.find({ quantity: { $lt: lowStockThreshold } });
    res.status(200).json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch low stock alerts', error: err });
  }

});
app.get('/statistics', async (req, res) => {
  try {
    // Agrégation pour les produits les plus vendus
    
    const topSelling = await Vente.aggregate([
      {
        $group: {
          _id: '$productName',
          totalSales: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
      { $sort: { totalSales: -1 } },
      { $limit: 10 },
    ]).exec();

    // Agrégation pour les produits les moins vendus
    const leastSelling = await Vente.aggregate([
      {
        $group: {
          _id: '$productName',
          totalSales: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
      { $sort: { totalSales: 1 } },
      { $limit: 10 },
    ]).exec();

    // Récupérer les détails des produits
    const productNames = [
      ...new Set([...topSelling.map(item => item._id), ...leastSelling.map(item => item._id)]),
    ];
    const products = await Product.find({ name: { $in: productNames } }).exec();

    // Mapper les données des produits
    const mapProducts = (data) => data.map((item) => {
      const product = products.find((prod) => prod.name === item._id);
      return {
        productName: product ? product.name : 'Unknown',
        totalSales: item.totalSales,
      };
    });

    res.json({
      topSelling: mapProducts(topSelling),
      leastSelling: mapProducts(leastSelling),
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).send('Erreur lors de la récupération des statistiques');
  }
});



module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));