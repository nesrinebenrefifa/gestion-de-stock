import { useEffect, useState } from 'react';

const VenteList = () => {
    const [ventes, setVentes] = useState([]);

    useEffect(() => {
        const fetchVentes = async () => {
            const response = await fetch('http://localhost:5000/ventes');
            const data = await response.json();

            // Assurez-vous que chaque vente a un identifiant unique
            const ventesAvecId = data.map((vente, index) => ({
                ...vente,
                id: vente.id || index, // Utilisez `vente.id` ou l'index comme clé unique de secours
            }));

            setVentes(ventesAvecId);
        };
        fetchVentes();
    }, []);

    return (
        <div>
            <h2>Liste des ventes enregistrées</h2>
            <ul>
                {ventes.map((vente) => (
                    <li key={vente.id}>
                        <p>Nom du produit: {vente.productName}</p>
                        <p>Quantité: {vente.quantity}</p>
                        <p>Prix: {vente.price.toFixed(2)} Dt</p>
                        <p>Date: {vente.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VenteList;
