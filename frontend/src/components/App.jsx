
import Home from './Tableau-de-bord/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from './Tableau-de-bord/Dashboard';
import '../images/app.css';
import ProductForm from './gestion-de-produit/ProductForm';
import Ventes1 from './ventes/Ventes1';
import Factures from './factures/Factures';
import ReportGenerator from './Rapports/ReportGenerator';
import { useState } from 'react';
import SupplierForm from './Supplier/SupplierForm ';

function App() {

  const [ventes] = useState([]);
 
  

  return (
    
    <div    className="d-flex  align-items-center" 
    style={{ 
      backgroundImage: "linear-gradient(to right, #00d5ff, #0095ff)",
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }}>

      <BrowserRouter >
   
        <Routes>
      
          <Route path="/" element ={<Register/>} />
          <Route path="/home" element ={<Dashboard/>} />
          <Route path="/home" element ={<Home/>} />
      

          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/add" element={<ProductForm editMode={false} />} />
      
          <Route path="/Ventes" element ={<Ventes1/>} />
          <Route path="/Factures" element ={<Factures/>} />
          <Route path="/ReportGenerator" element ={<ReportGenerator ventes={ventes}/>} />
          <Route path="/suppliers" element ={<SupplierForm/>} />
         
          {/* <Route path="/Dashboard" element ={ <Dashboard/>} /> */}
        </Routes>
      </BrowserRouter>
      
    
    </div>
  )
}

export default App
