import { useState, useEffect } from "react";
import FactureForm from "./FactureForm ";
import FactureList from "./FactureList";
import Home from "../Tableau-de-bord/Home";

const Factures = () => {
  const [factures, setFactures] = useState([]);

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const response = await fetch("http://localhost:5000/factures");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFactures(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFactures();
  }, []);

  const handleAddFacture = (newFacture) => {
    setFactures([...factures, newFacture]);
  };

  return (
    <div>
      <Home />
      <div style={{ marginLeft: "287px", padding: "20px", flex: 1 }}>
        <h2>Factures</h2>
        <FactureForm onAddFacture={handleAddFacture} />
        <FactureList factures={factures} />
      </div>
    </div>
  );
};

export default Factures;
