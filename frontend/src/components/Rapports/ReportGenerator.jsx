// import React from 'react';
import { jsPDF } from 'jspdf';
import ChartComponent from './ChartComponent';

const ReportGenerator = () => {
    const generatePDF = () => {
        const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Rapport sur l\'état des stocks', 105, 20, null, null, 'center');

  // Add a table of stock data
  doc.autoTable({
    startY: 30,
    head: [['Produit', 'Quantité', 'Statut']],
    body: stockData.map(item => [
      item.productName, 
      item.quantity, 
      item.quantity < item.lowStockThreshold ? 'Stock bas' : 'En stock'
    ]),
  });

  doc.save('rapport_etat_stocks.pdf');
};

// Exemple de données de stock
const stockData = [
  { productName: 'Produit 1', quantity: 20, lowStockThreshold: 5 },
  { productName: 'Produit 2', quantity: 3, lowStockThreshold: 5 },
  // Ajoutez d'autres produits ici
];


    return (
        <div>
            <h2>Génération de Rapports</h2>
            <button onClick={generatePDF}>Exporter en PDF</button>
            <ChartComponent data={stockData} />
        </div>
    );
};

export default ReportGenerator;
