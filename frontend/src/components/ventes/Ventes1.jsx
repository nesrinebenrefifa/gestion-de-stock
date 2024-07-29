import  { useState } from 'react';
import VenteForm from './VenteForm';
import VenteList from './VenteList';
import Home from '../Tableau-de-bord/Home';


const Ventes1 = () => {
    const [ventes, setVentes] = useState([]);

    const handleAddVente = (newVente) => {
        setVentes((prevVentes) => [...prevVentes, newVente]);
    };

    return (
        <div>
        <Home/>
    <div  style={{ marginLeft:'287px', padding: '20px', flex: 1 }}>
        <div>
            <h1>Suivi des Ventes</h1>
            <VenteForm onAddVente={handleAddVente} />
            <VenteList ventes={ventes} />
        </div>  </div>  </div>
    );
};

export default Ventes1;
