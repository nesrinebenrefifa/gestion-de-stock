// import React from 'react';
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";



const Home = () => {
  return (
    <div
    
      className="d-flex flex-column " >
      <Sidebar>
      <div style={{ padding: '30px', textAlign: 'center' }}>
          <img 
            src={'data:image/jpeg;base64,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'} 
            alt="Logo" 
            style={{ width: '150px', height: '50PX', marginBottom: '20px' }} 
          />
        </div>
        <Menu >
          <MenuItem 
            component={<Link to="/home"  />}>
         
            Dashboard
          </MenuItem>
        </Menu>
        <Menu>
          <MenuItem component={<Link to="/add" />}>
            Gestion de produit
          </MenuItem>
        </Menu>
        <Menu>
          <MenuItem component={<Link to="/Ventes"/>}>Suivi des Ventes</MenuItem>
        </Menu>
        <Menu>
          <MenuItem component={<Link to="/Factures" />}>
            génération de Factures
          </MenuItem>
        </Menu>

        <Menu>
          <MenuItem component={<Link to="/ReportGenerator" />}>Rapports</MenuItem>
        </Menu>
        <Menu>
          <MenuItem component={<Link to="/login" />}>Logout</MenuItem>
        </Menu>
        <Menu>
          <MenuItem component={<Link to=" " />}></MenuItem>
        </Menu>

        <Menu>
          <MenuItem> </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Home;
