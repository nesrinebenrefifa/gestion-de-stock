import  { useState } from 'react';

import FactureForm from './FactureForm ';
import FactureList from './FactureList';
import Home from '../Tableau-de-bord/Home';

const Factures = () => {
    const [ setFactures] = useState([]);

 

    const handleAddFacture = (newFacture) => {
        setFactures((prevFactures) => [...prevFactures, newFacture]);
    };

    return (
        <div>
              <Home/>
              <div  style={{ marginLeft:'287px', padding: '20px', flex: 1 }}>
           
            <h1>Génération de Factures</h1>
            <FactureForm onAddFacture={handleAddFacture} />
            <FactureList />
        </div></div>
    );
};

export default Factures;
