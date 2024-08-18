import { useState, useEffect } from "react";
import axios from "axios";

const LowStockAlerts = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchLowStockAlerts();
    fetchTotalProducts();
  }, []);

  const fetchLowStockAlerts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/low-stock-alerts"
      );
      setLowStockProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch low stock alerts:", err);
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setTotalProducts(response.data.length);
    } catch (err) {
      console.error("Failed to fetch total products:", err);
    }
  };

  const lowStockPercentage = (
    (lowStockProducts.length / totalProducts) *
    100
  ).toFixed(2);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Alertes de stock bas</h2>

      <div>
        <p>Produits en stock bas: {lowStockProducts.length}</p>
        <p>Pourcentage de stock bas:<h3>{lowStockPercentage}%</h3> </p>
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ddd", padding: "10px" }}>
              Produit
            </th>
            <th
              style={{
                borderBottom: "2px solid #ddd",
                padding: "10px",
                textAlign: "right",
              }}
            >
              Quantité
            </th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.map((product) => (
            <tr key={product._id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {product.name}
              </td>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "right",
                }}
              >
                {product.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockAlerts;
