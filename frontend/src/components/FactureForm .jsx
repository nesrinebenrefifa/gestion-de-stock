import  { useState } from 'react';

const FactureForm = ({ onAddFacture }) => {
    const [customerName, setCustomerName] = useState('');
    const [date, setDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFacture = { customerName, date, totalAmount: parseFloat(totalAmount) };
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
            setCustomerName('');
            setDate('');
            setTotalAmount('');
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
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
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
            <div>
                <label>Montant total</label>
                <input 
                    type="number" 
                    step="0.01"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Générer Facture</button>
        </form>
    );
};

export default FactureForm;
