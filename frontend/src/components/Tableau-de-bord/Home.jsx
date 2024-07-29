// import React from 'react';
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from '/src/images/logo.png' // Adjust the path to your logo


const Home = () => {
  return (
    <div>
      <Sidebar  style={{float:"left"}}>
      <div style={{ padding: '30px', textAlign: 'center' }}>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: '150px', height: '50PX', marginBottom: '10px' }} 
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
          <MenuItem component={<Link to="/suppliers " />}>Fournisseur</MenuItem>
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
          <MenuItem> </MenuItem>
        </Menu>
      </Sidebar>
     
    </div>
  );
};

export default Home;
