import { useState, useEffect } from "react";
import axios from "axios";

const VenteForm = ({ onAddVente }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductChange = (e) => {
    const selectedProduct = products.find(
      (product) => product.name === e.target.value
    );
    setProductName(e.target.value);
    setPrice(selectedProduct ? selectedProduct.salePrice : "");
    setQuantity(selectedProduct ? selectedProduct.quantity : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedProduct = products.find(
        (product) => product.name === productName
      );
      if (selectedProduct.quantity < quantity) {
        setAlert("pas assez de quantité en stock");
        return;
      }

      const newVente = {
        id: Date.now(), // Generate a unique ID based on the current timestamp
        productName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        date,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/ventes/add",
          newVente,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.data;
        onAddVente(data);
        resetForm();
        setAlert("Vente réalisée avec succès !");
      } catch (err) {
        console.error(err);
        setAlert("Erreur lors de la réalisation de la vente.");
      }
    } else {
      setAlert("Veuillez remplir tous les champs correctement.");
    }
  };

  const validateForm = () => {
    return (
      productName.trim() !== "" &&
      quantity > 0 &&
      price > 0 &&
      date.trim() !== ""
    );
  };

  const resetForm = () => {
    setProductName("");
    setQuantity("");
    setPrice("");
    setDate("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du produit</label>
          <select
            name="productName"
            value={productName}
            onChange={handleProductChange}
            required
          >
            <option value="" disabled>
              Nom du produit
            </option>
            {products.map((product) => (
              <option key={product._id} value={product.name}>
                {product.name}
              </option>
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
        <button type="submit" disabled={!validateForm()}>
          Ajouter Vente
        </button>
      </form>
      {alert && <div style={{ color: "red", marginTop: "10px" }}>{alert}</div>}
    </div>
  );
};

export default VenteForm;
