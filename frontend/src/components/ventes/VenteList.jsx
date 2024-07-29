import { useEffect, useState } from 'react';

const VenteList = () => {
    const [ventes, setVentes] = useState([]);

    useEffect(() => {
        const fetchVentes = async () => {
            try {
                const response = await fetch('http://localhost:5000/ventes');
                const data = await response.json();

                // Assurez-vous que chaque vente a un identifiant unique
                const ventesAvecId = data.map((vente, index) => ({
                    ...vente,
                    id: vente.id || index, // Utilisez `vente.id` ou l'index comme clé unique de secours
                }));

                setVentes(ventesAvecId);
            } catch (err) {
                console.error('Failed to fetch ventes:', err);
            }
        };
        fetchVentes();
    }, []);

    return (
        <div>
           
            <h2>Liste des ventes enregistrées</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom du produit</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ventes.map((vente) => (
                        <tr key={vente.id}>
                            <td>{vente.productName}</td>
                            <td>{vente.quantity}</td>
                            <td>{vente.price.toFixed(2)} Dt</td>
                            <td>{vente.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
       
        </div>
    );
};

export default VenteList;
