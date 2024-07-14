// import React from 'react';
import { jsPDF } from 'jspdf';
import ChartComponent from './ChartComponent';

const ReportGenerator = ({ ventes }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Rapport des ventes', 10, 10);
        ventes.forEach((vente, index) => {
            doc.text(`Vente ${index + 1}:`, 10, 20 + index * 10);
            doc.text(`Nom du produit: ${vente.productName}`, 20, 30 + index * 10);
            doc.text(`Quantité: ${vente.quantity}`, 20, 40 + index * 10);
            doc.text(`Prix: ${vente.price.toFixed(2)} €`, 20, 50 + index * 10);
            doc.text(`Date: ${new Date(vente.id).toLocaleDateString()}`, 20, 60 + index * 10);
        });
        doc.save('rapport.pdf');
    };

    const data = {
        labels: ventes.map((vente) => new Date(vente.id).toLocaleDateString()),
        sales: ventes.map((vente) => vente.quantity * vente.price),
    };

    return (
        <div>
            <h2>Génération de Rapports</h2>
            <button onClick={generatePDF}>Exporter en PDF</button>
            <ChartComponent data={data} />
        </div>
    );
};

export default ReportGenerator;
