// import React from 'react';
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import ventes from "../images/ventes.png"
import '../images/app.css';

const Home = () => {
  return (
    <div
    
      className="d-flex flex-column " >
      <Sidebar>
        <Menu>
          <MenuItem
            component={<Link to="/Dashboard"  />}>
         
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
          <MenuItem component={<Link to="/Customers " />}> client</MenuItem>
        </Menu>

        <Menu>
          <MenuItem> </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Home;
