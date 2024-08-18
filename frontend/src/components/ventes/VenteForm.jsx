import { useState, useEffect } from 'react';
import axios from 'axios';

const VenteForm = ({ onAddVente }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductChange = (e) => {
    const selectedProduct = products.find(product => product.name === e.target.value);
    setProductName(e.target.value);
    setPrice(selectedProduct ? selectedProduct.salePrice : '');
    setQuantity(selectedProduct ? selectedProduct.quantity : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedProduct = products.find(product => product.name === productName);
      if (selectedProduct.quantity < quantity) {
        setAlert('Not enough quantity in stock');
        return;
      }

      const newVente = {
        id: Date.now(), // Generate a unique ID based on the current timestamp
        productName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        date
      };

      try {
        const response = await axios.post('http://localhost:5000/ventes', newVente, {
          headers: { 'Content-Type': 'application/json' }
        });
        setAlert('');
        alert('Vente réalisée avec succès !');

        const data = await response.data;
        onAddVente(data);
        resetForm();
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const validateForm = () => {
    return productName.trim() !== '' &&
      quantity > 0 &&
      price > 0 &&
      date.trim() !== '';
  };

  const resetForm = () => {
    setProductName('');
    setQuantity('');
    setPrice('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom du produit</label>
        <select
          name="productName"
          value={productName}
          onChange={handleProductChange}
          required
        >
          <option value="" disabled>Nom du produit</option>
          {products.map(product => (
            <option key={product._id} value={product.name}>{product.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantité</label>
        <input
          type="number"
          name="quantity"
         
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
      </div>
      <div>
        <label>Prix unitaire</label>
        <input
          type="number"
          name="price"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.01"
          required
          readOnly
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={!validateForm()}>Ajouter Vente</button>
      {alert && <div style={{ color: 'red' }}>{alert}</div>}
    </form>
  );
};

export default VenteForm;
