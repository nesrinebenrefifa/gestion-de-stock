import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import logo from '/src/images/logo.png' // Adjust the path to your logo

const FactureList = () => {
    const [factures, setFactures] = useState([]);

    useEffect(() => {
        const fetchFactures = async () => {
            try {
                const response = await fetch('http://localhost:5000/factures');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFactures(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchFactures();
    }, []);

    const handleExport = (facture) => {
        const doc = new jsPDF();
        
        // Header
        doc.setFillColor(0, 102, 204);
        doc.rect(0, 30, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(`Facture N°  ${facture.clientName}`, 105, 42, null, null, 'center');

        // Company Info Frame
        doc.setDrawColor(0);
        doc.rect(10, 50, 150, 60);
        doc.addImage(logo, 'PNG', 165, 50, 30, 30); // Add the logo next to the frame
        
        // Company Info Text
        doc.setTextColor(33, 0, 0);
        doc.setFontSize(12);
        doc.text('Jaouadi Anis (LAB-IT)', 15, 60);
        doc.text('Adresse: Cité Ezzahra rue des catacombes Souk lahad Sousse', 15, 70);
        doc.text('Matricule Fiscale: 1668688K/P/C/000', 15, 80);
        doc.text('Tél: 50234911', 15, 90);
        doc.text('Email: contact@lab-it.tn', 15, 100);

        // Facture Info
        doc.text(`Date: ${facture.date}`, 10, 120);
        doc.text('Modalité de paiement: Espèce', 10, 130);
        doc.text('Période: oct-23', 10, 140);
        doc.text('Intervenant: Mr Jaouadi Anis', 10, 150);

        // Client Info
        doc.text(`Nom du client: ${facture.clientName}`, 10, 160);
        doc.text(`Email du client: ${facture.clientEmail}`, 10, 170);
        doc.text(`Montant total: ${facture.totalAmount.toFixed(2)} DT`, 10, 180);

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
            startY: 190,
        });

        // Footer
        doc.text('Arrêtée la présente facture à la somme de : Mille trois cent trente et un dinars', 10, doc.autoTable.previous.finalY + 20);
        doc.text('Cachet et signature', 10, doc.autoTable.previous.finalY + 30);

        // Footer Info
        const footerData = [
            {
                key: 'Siège Sociale',
                value: 'Adresse: Cité Ezzahra rue des catacombes Souk lahad Sousse\nCode Postale: 4002\nTunisie\nMatricule Fiscale: 1668688K/P/C/000',
            },
            {
                key: 'Coordonnées',
                value: 'Mr Jaouadi Anis\nTel: 50234911\nEmail: anisjaouadi@lab-it.tn',
            },
            {
                key: 'Détails Bancaires',
                value: 'Banque: Attijari Bank\nRIB: 04504011005259165870\nwww.lab-it.tn',
            },
        ];

        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 40,
            head: [[' ', ' ']],
            body: footerData.map((row) => [row.key, row.value]),
            styles: { cellWidth: 'wrap' },
            columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 140 } },
        });

        doc.save(`facture_${facture._id}.pdf`);
    };

    return (
        <div>
            <h2>Liste des factures</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom du client</th>
                        <th>Email du client</th>
                        <th>Date</th>
                        <th>Montant total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {factures.map((facture) => (
                        <tr key={facture._id}>
                            <td>{facture.clientName}</td>
                            <td>{facture.clientEmail}</td>
                            <td>{facture.date}</td>
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
