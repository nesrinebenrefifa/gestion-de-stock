import { useEffect, useState } from 'react';


const VenteList = () => {
    const [ventes, setVentes] = useState([]);

    useEffect(() => {
        const fetchVentes = async () => {
            const response = await fetch('http://localhost:5000/ventes');
            const data = await response.json();
            setVentes(data);
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
                        <p>Date: {new Date(vente.id).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VenteList;
