import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import logo from "/src/images/logo.png"; // Assurez-vous que le chemin vers votre logo est correct

const FactureList = () => {
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

  const handleExport = (facture) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 10, 210, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(
      `Facture N° ${facture.items[0].Number}`,
      105,
      22,
      null,
      null,
      "center"
    );

    // Company Info Frame
    doc.setDrawColor(0);
    doc.rect(10, 35, 190, 40);
    doc.addImage(logo, "PNG", 165, 40, 30, 30); // Add the logo next to the frame

    // Company Info Text
    doc.setTextColor(33, 0, 0);
    doc.setFontSize(10);
    doc.text("Jaouadi Anis (LAB-IT)", 15, 45);
    doc.text(
      "Adresse: Cité Ezzahra rue des catacombes Souk lahad Sousse",
      15,
      55
    );
    doc.text("Matricule Fiscale: 1668688K/P/C/000", 15, 65);
    doc.text("Tél: 50234911", 15, 75);
    doc.text("Email: contact@lab-it.tn", 15, 85);

    // Facture Info
    doc.setFontSize(12);
    doc.text(`Date: ${facture.date}`, 10, 100);
    doc.text(
      `Modalité de paiement: ${facture.paymentMethod || "Non spécifiée"}`,
      10,
      110
    ); // Added Modalité de paiement
    doc.text(`Période: ${facture.period || "Non spécifiée"}`, 10, 120); // Added Période
    doc.text(`Intervenant: ${facture.intervenant || "Non spécifié"}`, 10, 130); // Added Intervenant

    // Client Info
    doc.text(`Nom du client: ${facture.clientName}`, 10, 140);
    doc.text(`Email du client: ${facture.clientEmail}`, 10, 150);
    doc.text(`Montant total: ${facture.totalAmount.toFixed(2)} DT`, 10, 160);

    const tableColumn = ["Produit", "Quantité", "Prix Unitaire", "Total"];
    const tableRows = facture.items.map((item) => [
      item.productName,
      item.quantity,
      item.unitPrice.toFixed(2),
      (item.quantity * item.unitPrice).toFixed(2),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 170,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
    });

    const footerData = [
      {
        key: "Siège Sociale",
        value:
          "Adresse: Cité Ezzahra rue des catacombes Souk lahad Sousse\nCode Postale: 4002\nTunisie\nMatricule Fiscale: 1668688K/P/C/000",
      },
      {
        key: "Coordonnées",
        value: "Mr Jaouadi Anis\nTel: 50234911\nEmail: anisjaouadi@lab-it.tn",
      },
      {
        key: "Détails Bancaires",
        value:
          "Banque: Attijari Bank\nRIB: 04504011005259165870\nwww.lab-it.tn",
      },
    ];

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 30,
      head: [[" ", " "]],
      body: footerData.map((row) => [row.key, row.value]),
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 140 } },
    });

    doc.save(`facture_${facture._id}.pdf`);
  };

  return (
    <div className="form-group">
      <h2>Liste des factures</h2>
      <table>
        <thead>
          <tr>
            <th>Nom du client</th>
            <th>Email du client</th>
            <th>Matricule Fiscale</th>
            <th>Date</th>
            <th>Modalité de paiement</th> {/* Added Column */}
            <th>Période</th> {/* Added Column */}
            <th>Intervenant</th> {/* Added Column */}
            <th>Montant total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {factures.map((facture) => (
            <tr key={facture._id}>
              <td>{facture.clientName}</td>
              <td>{facture.clientEmail}</td>
              <td>{facture.MatriculeFiscale}</td>
              <td>{facture.date}</td>
              <td>{facture.paymentMethod || "Non spécifiée"}</td>{" "}
              <td>{facture.period || "Non spécifiée"}</td>{" "}
              {/* Added Column Data */}
              <td>{facture.intervenant || "Non spécifié"}</td>{" "}
              {/* Added Column Data */}
              <td>{facture.totalAmount.toFixed(2)} DT</td>
              <td>
                <button onClick={() => handleExport(facture)}>
                  <FontAwesomeIcon icon={faFilePdf} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FactureList;
