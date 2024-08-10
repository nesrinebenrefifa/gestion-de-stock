import { useState, useEffect } from 'react';
import axios from 'axios';

const StockOverview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchStockOverview();
  }, []);

  const fetchStockOverview = async () => {
    try {
      const response = await axios.get('http://localhost:5000/stock-overview');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch stock overview:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
   

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Nom du produit</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'right' }}>Quantité</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{product.name}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockOverview;
