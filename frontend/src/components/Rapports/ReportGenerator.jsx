// import React from 'react';
import { jsPDF } from 'jspdf';
import ChartComponent from './ChartComponent';
import Home from '../Tableau-de-bord/Home';

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
 
  // Ajoutez d'autres produits ici
];


    return (
      <div 
      >
        <Home/>
        <div>
        
            <ChartComponent data={stockData} />
            <button onClick={generatePDF}>Exporter en PDF</button>
        </div></div>
    );
};

export default ReportGenerator;
