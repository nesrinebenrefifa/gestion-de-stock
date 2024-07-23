import { useState } from 'react';

const FactureForm = ({ onAddFacture }) => {
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [date, setDate] = useState('');
    const [items, setItems] = useState([{ productName: '', quantity: 0, unitPrice: 0 }]);

    const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...items];
        newItems[index][name] = value;
        setItems(newItems);
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalAmount = items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
        const newFacture = { clientName, clientEmail, date, items, totalAmount };
        try {
            const response = await fetch('http://localhost:5000/factures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newFacture),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            onAddFacture(data);
            setClientName('');
            setClientEmail('');
            setDate('');
            setItems([{ productName: '', quantity: 0, unitPrice: 0 }]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom du client</label>
                <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email du client</label>
                <input 
                    type="email" 
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date</label>
                <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            {items.map((item, index) => (
                <div key={index}>
                    <label>Produit</label>
                    <input 
                        type="text" 
                        name="productName" 
                        value={item.productName}
                        onChange={(e) => handleItemChange(index, e)}
                        required
                    />
                    <label>Quantité</label>
                    <input 
                        type="number" 
                        name="quantity" 
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        required
                    />
                    <label>Prix Unitaire</label>
                    <input 
                        type="number" 
                        name="unitPrice" 
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, e)}
                        required
                    />
                 
                </div>
            ))}
           
            <button type="submit">Générer Facture</button>
        </form>
    );
};

export default FactureForm;
