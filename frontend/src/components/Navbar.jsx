import React from 'react';
import '../styles/Navbar.css';
import locationIcon from '../assets/location.svg';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <img className="img-navbar" src={locationIcon} alt="Concepcion del Uruguay" />
        <h1 className="title-navbar">Turismo Concepción</h1>
      </div>
      <div className="navbar-links">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/agregar-lugar">Agregar</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;