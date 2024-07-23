import  { useState, useEffect } from 'react';
import axios from 'axios';


const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', quantity: '', purchasePrice: '', salePrice: '', supplier: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/add', form);
      setProducts([...products, response.data]);
      setForm({ name: '', description: '', quantity: '', purchasePrice: '', salePrice: '', supplier: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/edit/${id}`, form);
      setProducts(products.map(product => (product._id === id ? response.data : product)));
      setForm({ name: '', description: '', quantity: '', purchasePrice: '', salePrice: '', supplier: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    
      <div>
        <h2>Gestion des Produits</h2>
        <div>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom" />
          <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantité" />
          <input type="number" name="purchasePrice" value={form.purchasePrice} onChange={handleChange} placeholder="Prix d'Achat" />
          <input type="number" name="salePrice" value={form.salePrice} onChange={handleChange} placeholder="Prix de Vente" />
          <input type="text" name="supplier" value={form.supplier} onChange={handleChange} placeholder="Fournisseur" />
          <button onClick={handleAddProduct}>Ajouter Produit</button>
        </div>
        <ul>
          {products.map(product => (
            <li key={product._id}>
              {product.name} - {product.description} - {product.quantity} - {product.purchasePrice} - {product.salePrice} - {product.supplier}
              <button onClick={() => handleEditProduct(product._id)}>Modifier</button>
              <button onClick={() => handleDeleteProduct(product._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default ProductManagement;
