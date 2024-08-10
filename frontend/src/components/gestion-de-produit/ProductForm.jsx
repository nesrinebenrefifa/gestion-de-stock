import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../Tableau-de-bord/Home';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', quantity: '', purchasePrice: '', salePrice: '', supplier: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/suppliers');
      setSuppliers(response.data);
      console.log(response.data); // Debug: Check the data fetched
    } catch (err) {
      console.error('Failed to fetch suppliers:', err); // Improved error message
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err); // Improved error message
    }
  };

  const handleAddProduct = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/add', form);
        setProducts([...products, response.data]);
        resetForm();
      } catch (err) {
        console.error('Failed to add product:', err); // Improved error message
      }
    }
  };

  const handleUpdateProduct = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(`http://localhost:5000/edit/${currentProductId}`, form);
        setProducts(products.map(product => (product._id === currentProductId ? response.data : product)));
        resetForm();
        setEditMode(false);
        setCurrentProductId(null);
      } catch (err) {
        console.error('Failed to update product:', err); // Improved error message
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err); // Improved error message
    }
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setCurrentProductId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      supplier: product.supplier
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'quantity' || name === 'purchasePrice' || name === 'salePrice') && value <= 0) {
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    return (
      form.name.trim() !== '' &&
      form.description.trim() !== '' &&
      form.quantity > 0 &&
      form.purchasePrice > 0 &&
      form.salePrice > 0 &&
      form.supplier.trim() !== ''
    );
  };

  const resetForm = () => {
    setForm({ name: '', description: '', quantity: '', purchasePrice: '', salePrice: '', supplier: '' });
  };

  return (
    <div>
      <Home />
      <div style={{ marginLeft: '287px', padding: '20px', flex: 1 }}>
        <h2>Gestion des Produits</h2>
        <div>
        <div className="form-group">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom" />
          <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantité" min="1" />
          <input type="number" name="purchasePrice" value={form.purchasePrice} onChange={handleChange} placeholder="Prix d'Achat" min="0.01" step="1" />
          <input type="number" name="salePrice" value={form.salePrice} onChange={handleChange} placeholder="Prix de Vente" min="0.01" step="0.01" />
          <select name="supplier" value={form.supplier} onChange={handleChange} required>
            <option value="" disabled>Fournisseur</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier.firstName}>{supplier.firstName}</option>
            ))}
          </select></div>
          {editMode ? (
            <button onClick={handleUpdateProduct} disabled={!validateForm()}>Mettre à jour le produit</button>
          ) : (
            <button onClick={handleAddProduct} disabled={!validateForm()}>Ajouter Produit</button>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Quantité</th>
              <th>Prix dAchat</th>
              <th>Prix de Vente</th>
              <th>Fournisseur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.purchasePrice}</td>
                <td>{product.salePrice}</td>
                <td>{product.supplier}</td>
                <td>
                  <i className="fas fa-edit" onClick={() => handleEditProduct(product)} style={{ cursor: 'pointer', marginRight: '10px' }}></i>
                  <i className="fas fa-trash" onClick={() => handleDeleteProduct(product._id)} style={{ cursor: 'pointer' }}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
