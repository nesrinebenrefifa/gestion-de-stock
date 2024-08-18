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
    doc.text(`Facture N° ${facture.items[0].Number}`, 105, 22, null, null, "center");

    // Information sur l'entreprise
doc.setDrawColor(0);
doc.rect(10, 35, 190, 50);
doc.addImage(logo, "PNG", 165, 40, 30, 30); // Ajout du logo
doc.setTextColor(33, 0, 0);
doc.setFontSize(10);

doc.setFont("helvetica", "bold");
doc.text("Jaouadi Anis (LAB-IT)", 15, 45); // Texte en gras

doc.setFont("helvetica", "bold");
doc.text("Adresse:", 15, 55); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text("Cité Ezzahra rue des catacombes Souk lahad Sousse", 30, 55); // Adresse en police normale

doc.setFont("helvetica", "bold");
doc.text("Matricule Fiscale:", 15, 65); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text("1668688K/P/C/000", 50, 65); // Matricule Fiscale en police normale

doc.setFont("helvetica", "bold");
doc.text("Tél:", 15, 75); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text("50234911", 25, 75); // Tél en police normale

doc.setFont("helvetica", "bold");
doc.text("Email:", 15, 85); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text("contact@lab-it.tn", 30, 85); // Email en police normale


   // Cadre 1 - Informations du client
doc.setDrawColor(0);
doc.rect(10, 90, 90, 40); // Cadre autour des informations du client

doc.setFontSize(10);
doc.setFont("helvetica", "bold");
doc.text(`Nom du client:`, 15, 100); // Texte en gras

doc.setFont("helvetica", "normal");
doc.text(`${facture.clientName}`, 55, 100); // Le nom du client en police normale

doc.setFont("helvetica", "bold");
doc.text(`Email du client:`, 15, 110); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text(`${facture.clientEmail}`, 55, 110); // L'email du client en police normale

doc.setFont("helvetica", "bold");
doc.text(`Matricule Fiscale:`, 15, 120); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text(`${facture.MatriculeFiscale}`, 55, 120); // Le matricule fiscale en police normale

  // Cadre 2 - Informations de la facture
doc.rect(110, 90, 90, 40); // Cadre autour des informations de la facture
doc.setFontSize(10);

doc.setFont("helvetica", "bold");
doc.text(`Date:`, 115, 100); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text(`${facture.date}`, 125, 100); // Date en police normale

doc.setFont("helvetica", "bold");
doc.text(`Modalité de paiement:`, 115, 110); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text(`${facture.paymentMethod || "Non spécifiée"}`, 153, 110); // Modalité de paiement en police normale

doc.setFont("helvetica", "bold");
doc.text(`Période:`, 115, 120); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text(`${facture.period || "Non spécifiée"}`, 130, 120); // Période en police normale

doc.setFont("helvetica", "bold");
doc.text(`Intervenant:`, 115, 130); // Texte en gras
doc.setFont("helvetica", "normal");
doc.text(`${facture.intervenant || "Non spécifié"}`, 140, 130); // Intervenant en police normale


    // Tableau des produits
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
      startY: 135, // Start after the frames
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
    });

    // Calcul et ajout du montant total
    const totalAmount = facture.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    doc.setFontSize(12);
    doc.text(`Montant Total: ${totalAmount.toFixed(2)} DT`, 15, doc.autoTable.previous.finalY + 10);

    // Informations de pied de page
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
        value: "Banque: Attijari Bank\nRIB: 04504011005259165870\nwww.lab-it.tn",
      },
    ];

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
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
            <th>Modalité de paiement</th>
            <th>Période</th>
            <th>Intervenant</th>
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
              <td>{facture.paymentMethod || "Non spécifiée"}</td>
              <td>{facture.period || "Non spécifiée"}</td>
              <td>{facture.intervenant || "Non spécifié"}</td>
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
