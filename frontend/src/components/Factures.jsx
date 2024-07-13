import  { useState } from 'react';

import FactureForm from './FactureForm ';
import FactureList from './FactureList';


const Factures = () => {
    const [ setFactures] = useState([]);

 

    const handleAddFacture = (newFacture) => {
        setFactures((prevFactures) => [...prevFactures, newFacture]);
    };

    return (
        <div>
           
            <h1>Génération de Factures</h1>
            <FactureForm onAddFacture={handleAddFacture} />
            <FactureList />
        </div>
    );
};

export default Factures;
