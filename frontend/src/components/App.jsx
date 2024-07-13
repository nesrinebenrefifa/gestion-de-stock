import Bar from './Bar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import Vente from './Vente';
import '../images/app.css';
import ProductForm from './ProductForm';
import Customers from './Customers';
import Ventes1 from './Ventes1';
import Factures from './Factures';
function App() {


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
      
        
     

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
