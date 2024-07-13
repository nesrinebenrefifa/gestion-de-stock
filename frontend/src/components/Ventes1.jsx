import  { useState } from 'react';
import VenteForm from './VenteForm';
import VenteList from './VenteList';


const Ventes1 = () => {
    const [ventes, setVentes] = useState([]);

    const handleAddVente = (newVente) => {
        setVentes((prevVentes) => [...prevVentes, newVente]);
    };

    return (
        <div>
            <h1>Suivi des Ventes</h1>
            <VenteForm onAddVente={handleAddVente} />
            <VenteList ventes={ventes} />
        </div>
    );
};

export default Ventes1;
