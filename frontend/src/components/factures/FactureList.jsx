import  { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
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

        doc.text('Facture', 10, 10);
        doc.text(`Nom du client: ${facture.customerName}`, 10, 20);
        doc.text(`Date: ${facture.date}`, 10, 30);
        doc.text(`Montant total: ${facture.totalAmount.toFixed(2)} DT`, 10, 40);

        doc.save(`facture_${facture.id}.pdf`);
    };

    return (
        <div>
            <h2>Liste des factures générées</h2>
            <ul>
                {factures.map((facture) => (
                    <li key={facture.id}>
                        <p>Nom du client: {facture.customerName}</p>
                        <p>Date: {facture.date}</p>
                        <p>Montant total: {facture.totalAmount.toFixed(2)} Dt</p>
                        <button onClick={() => handleExport(facture)}>Exporter</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FactureList;
