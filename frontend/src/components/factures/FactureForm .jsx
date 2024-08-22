import { useState, useEffect } from "react";

const FactureForm = ({ onAddFacture }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [MatriculeFiscale, setMatriculeFiscale] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [period, setPeriod] = useState("");
  const [intervenant, setIntervenant] = useState("");
  const [items, setItems] = useState([
    { id: Date.now(), productId: "", quantity: 1, unitPrice: 0, Number: "" },
  ]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/ventes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleProductChange = (index, event) => {
    const productId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    const newItems = [...items];

    if (selectedProduct) {
      newItems[index] = {
        ...newItems[index],
        productId: productId,
        unitPrice: selectedProduct.price,
        quantity: selectedProduct.quantity , // Set default quantity here
        Number: selectedProduct.number,
      };
    }
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now(), productId: "", quantity: 1, unitPrice: 0, Number: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
    const newFacture = {
      clientName,
      clientEmail,
      MatriculeFiscale,
      date,
      paymentMethod,
      period,
      intervenant,
      items: items.map((item) => {
        const product = products.find((p) => p._id === item.productId);
        return {
          productName: product ? product.productName : "",
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          Number: item.Number,
        };
      }),
      totalAmount,
    };

    try {
      const response = await fetch("http://localhost:5000/factures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFacture),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      onAddFacture(data);
      setClientName("");
      setClientEmail("");
      setMatriculeFiscale("");
      setDate("");
      setPaymentMethod("Espèce");
      setPeriod("oct-23");
      setIntervenant("Mr Jaouadi Anis");
      setItems([
        {
          id: Date.now(),
          productId: "",
          quantity: 0,
          unitPrice: 0,
          Number: "",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="facture-form">
      <div className="form-group">
        <label>Nom du client</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Matricule Fiscale</label>
        <input 
          type="text"
          value={MatriculeFiscale}
          onChange={(e) => setMatriculeFiscale(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email du client</label>
        <input
          type="email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Modalité de paiement</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="Espèce">Espèce</option>
          <option value="Shèque">Shèque</option>
          <option value="Virement bancaire">Virement bancaire</option>
        </select>
      </div>
      <div className="form-group">
        <label>Période</label>
        <input
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Intervenant</label>
        <input
          type="text"
          value={intervenant}
          onChange={(e) => setIntervenant(e.target.value)}
          required
        />
      </div>
      {items.map((item, index) => (
        <div key={item.id} className="item-group">
          <div className="form-group">
            <label>Produit</label>
            <select
              name="productId"
              value={item.productId}
              onChange={(e) => handleProductChange(index, e)}
              required
            >
              <option value="">Sélectionnez un produit</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.productName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Quantité</label>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Prix Unitaire</label>
            <input
              type="number"
              name="unitPrice"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, e)}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Numéro de facture</label>
            <input
              type="number"
              name="Number"
              value={item.Number}
              onChange={(e) => handleItemChange(index, e)}
              required
              min="0"
              step="1"
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>
        Ajouter un produit
      </button>
      <button type="submit">Générer Facture</button>
    </form>
  );
};

export default FactureForm;
