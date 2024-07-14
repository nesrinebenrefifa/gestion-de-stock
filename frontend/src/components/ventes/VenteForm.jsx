import  { useState } from 'react';

const VenteForm = ({ onAddVente }) => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVente = { productName, quantity: parseInt(quantity), price: parseFloat(price) };
        const response = await fetch('http://localhost:5000/ventes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVente),
        });
        const data = await response.json();
        onAddVente(data);
        setProductName('');
        setQuantity('');
        setPrice('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom du produit</label>
                <input 
                    type="text" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Quantité</label>
                <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Prix</label>
                <input 
                    type="number" 
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Ajouter Vente</button>
        </form>
    );
};

export default VenteForm;
