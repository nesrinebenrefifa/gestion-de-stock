import Bar from './Bar';
import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import Dashboard from './Dashboard';
import '../images/app.css';
import ProductForm from './ProductForm';
import Customers from './Customers';
import Ventes1 from './ventes/Ventes1';
import Factures from './factures/Factures';
import ReportGenerator from './Rapports/ReportGenerator';

// import VenteForm from './ventes/VenteForm';
// import VenteList from './ventes/VenteList';
// import FactureForm from '../factures/FactureForm';
// import FactureList from '../factures/FactureList';

import { useState } from 'react';
function App() {

  const [ventes] = useState([]);
 
  

  return (
    
    <div style={{
      backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
    }}>

      <BrowserRouter >
      <Bar/>
        <Routes>
        {/* <Route path="/Suivi" element ={<Vente/>} /> */}
          <Route path="/" element ={<Register/>} />
          <Route path="/home" element ={<Home/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/add" element={<ProductForm editMode={false} />} />
          <Route path="/Customers" element ={<Customers/>} />
          <Route path="/Ventes" element ={<Ventes1/>} />
          <Route path="/Factures" element ={<Factures/>} />
          <Route path="/ReportGenerator" element ={<ReportGenerator ventes={ventes}/>} />
         
          {/* <Route path="/Dashboard" element ={ <Dashboard/>} /> */}
        </Routes>
      </BrowserRouter>
      
    
    </div>
  )
}

export default App
